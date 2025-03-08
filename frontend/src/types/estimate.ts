export interface Marker {
    id: number;
    position: { x: number; y: number };
    details: Materials[];
}

export interface Position {
    x: number;
    y: number;
}

export interface Boundaries {
    maxX: number;
    maxY: number;
}

export interface ImageDimensions { // i dont believe this is used.
    naturalWidth: number;
    naturalHeight: number;
    displayWidth: number;
    displayHeight: number;
}

export interface Materials {
    id: string;
    category: string;
    name: string;
    description: string;
    dimensions: string;
    unit: string;
    price: number;
    availability: string;
}

export interface RoomCard {
    id: number;
    name: string;
    area: number;
    areaUnits: 'sqft';
    volume: number;
    volumeUnits: 'cuft';
    markers: Marker[];
}

export interface Estimate {
    lineItem: {
        marker: Marker[]
        
    }
}