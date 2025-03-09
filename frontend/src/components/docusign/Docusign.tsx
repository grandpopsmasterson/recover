import { apiService } from "@/api/service/apiService";
import { DocusignFormProps, DocusignResponse } from "@/types/docusign";
import { Button, Spinner } from "@heroui/react";
import { sign } from "crypto";
import { useEffect, useState } from "react";
import Iframe from 'react-iframe';

export const DocusignForm: React.FC<DocusignFormProps> = ({clientInfo, formId, onComplete}) => {
    const [signingUrl, setSigningUrl] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string|null>(null);

    const initiateDocusign = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiService.post<DocusignResponse>('/DOCUSIGN_ENDPOINT', {
                clientInfo: {
                    first_name: clientInfo.firstName,
                    last_name: clientInfo.lastName,
                    email: clientInfo.email
                },
                form_id: formId
            });
                setSigningUrl(data.signing_url)
        } catch (error) {
            setError('Failed to initiate the DocuSign process. Please try again.');
            console.error('=======', error);
        } finally {
            setLoading(false);
        }
    };

    

    useEffect(() => {
        const handleIframeMessage = (event: MessageEvent) => {
            if (event.data && event.data.event === 'signing_complete') {
                onComplete();
            }
        };
        window.addEventListener('message', handleIframeMessage);
        return () => {
            window.removeEventListener('message', handleIframeMessage);
        }
    }, [onComplete]);

    if (loading) {
        return <div>
                <Spinner />
                <div>Loading DocuSign form...</div>
            </div>
    };

    if (error) {
        return (
            <div>
                <p className="text-red-500">{error}</p>
                <Button onPress={initiateDocusign}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                > 
                Try Again
                </Button>
            </div>
        );
    };

    if (!signingUrl) {
        return (
            <Button
            onPress={initiateDocusign}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Sign Document
            </Button>
        );
    };

    return (
        <div className='w-full h-full'>
            <Iframe 
                url={signingUrl}
                width="100%"
                height="100%"
                id="docusign-iframe"
                className="border-0"
                display="block"
                position="relative"
            />
        </div>
    )
}