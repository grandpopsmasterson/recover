import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { Phone, Mail, Calendar, Star } from 'lucide-react';
import Image from 'next/image';

const ReleaseTimeline = () => {
    // State for dragging
const [isDragging, setIsDragging] = useState(false);
const [startX, setStartX] = useState(0);
const [scrollLeft, setScrollLeft] = useState(0);
const timelineRef = useRef<HTMLDivElement>(null);
const timelineContentRef = useRef<HTMLDivElement>(null);
const calendarContainerRef = useRef<HTMLDivElement>(null);
const [showAddForm, setShowAddForm] = useState(false);
const [newEpic, setNewEpic] = useState({
id: '',
title: '',
timeframe: { start: '', end: '' },
barColor: 'bg-purple-500'
});

// Tooltip state
const [tooltip, setTooltip] = useState({
visible: false,
content: null,
position: { x: 0, y: 0 },
isContractor: false
});

// Define contractor bubble colors
const bubbleColors = [
{ bg: "bg-blue-500/20", text: "text-blue-800" },
{ bg: "bg-green-500/20", text: "text-green-800" },
{ bg: "bg-purple-500/20", text: "text-purple-800" },
{ bg: "bg-amber-500/20", text: "text-amber-800" },
{ bg: "bg-rose-500/20", text: "text-rose-800" },
{ bg: "bg-teal-500/20", text: "text-teal-800" }
];

// Random color for contractor cards
const [colorIndex, setColorIndex] = useState(0);

// Initial state for zooming
const [zoomLevel, setZoomLevel] = useState(1); // 1 = months, 2 = weeks, 3 = days, 4 = 3-day detailed view
const [viewStart, setViewStart] = useState(new Date('2023-07-15'));
const [viewEnd, setViewEnd] = useState(new Date('2023-12-15'));
// Reduced maximum scale to prevent excessive expansion
const [timeScale, setTimeScale] = useState(100); // 100% = default, max 250%

useEffect(() => {
const randomIndex = Math.floor(Math.random() * bubbleColors.length);
setColorIndex(randomIndex);

// Add animation CSS to head
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
@keyframes tooltipFadeIn {
    from {
    opacity: 0;
    transform: translate(-50%, 20px);
    }
    to {
    opacity: 1;
    transform: translate(-50%, 0);
    }
}
`;
document.head.appendChild(style);

return () => {
    document.head.removeChild(style);
};
}, [bubbleColors.length]);

// Sample data
const [releases, setReleases] = useState([
{
    id: 'DSB-1',
    title: 'Epic 1',
    type: 'epic',
    status: 'DONE',
    timeframe: { start: '2023-08-01', end: '2023-08-20' },
    expanded: false,
    color: 'bg-purple-500',
    barColor: 'bg-yellow-400',
    children: [],
    description: 'Implementation of core features for the initial release.',
    assignedTo: 'Team Alpha'
},
{
    id: 'DSB-2',
    title: 'Epic 2',
    type: 'epic',
    status: '',
    timeframe: { start: '2023-08-25', end: '2023-10-10' },
    expanded: true,
    color: 'bg-purple-500',
    barColor: 'bg-red-400',
    description: 'User interface improvements and accessibility enhancements.',
    assignedTo: 'Team Beta',
    children: [
    {
        id: 'DSB-8',
        title: 'Story 1',
        type: 'story',
        status: 'DONE',
        timeframe: { start: '2023-08-25', end: '2023-09-10' },
        color: 'bg-green-500',
        description: 'Implementing user authentication flow',
        assignedTo: 'Jane Doe'
    },
    {
        id: 'DSB-9',
        title: 'Story 2',
        type: 'story',
        status: 'IN PROGRESS',
        timeframe: { start: '2023-09-10', end: '2023-09-25' },
        color: 'bg-green-500',
        description: 'Building responsive layouts for mobile devices',
        assignedTo: 'John Smith',
        isContractor: true,
        contractor: {
        name: "John Smith",
        phone: "(555) 123-4567",
        email: "john.smith@example.com",
        company: "Smith UI Design",
        rating: 4.8,
        reviews: 32,
        contractorType: "UI/UX",
        workDate: "Sep 10-25, 2023"
        }
    },
    {
        id: 'DSB-10',
        title: 'Task 1',
        type: 'task',
        status: 'DONE',
        timeframe: { start: '2023-09-25', end: '2023-10-05' },
        color: 'bg-blue-400',
        description: 'Implementing form validation for user inputs',
        assignedTo: 'Alex Johnson'
    }
    ]
},
{
    id: 'DSB-3',
    title: 'Epic 3',
    type: 'epic',
    status: '',
    timeframe: { start: '2023-09-15', end: '2023-10-25' },
    expanded: false,
    color: 'bg-purple-500',
    barColor: 'bg-purple-500',
    children: [],
    description: 'Backend API development and database optimization',
    assignedTo: 'Team Gamma'
},
{
    id: 'DSB-4',
    title: 'Epic 4 - Flooring Installation',
    type: 'epic',
    status: '',
    timeframe: { start: '2023-10-05', end: '2023-10-20' },
    expanded: true,
    color: 'bg-purple-500',
    barColor: 'bg-yellow-400',
    description: 'Complete flooring installation across all project areas',
    assignedTo: 'Construction Team',
    children: [
    {
        id: 'DSB-11',
        title: 'Hardwood Installation',
        type: 'story',
        status: 'SCHEDULED',
        timeframe: { start: '2023-10-05', end: '2023-10-12' },
        color: 'bg-green-500',
        description: 'Install hardwood flooring in living areas',
        isContractor: true,
        contractor: {
        name: "Diego Garcia",
        phone: "(555) 987-6543",
        email: "diego.garcia@example.com",
        company: "Garcia Construction",
        rating: 4.9,
        reviews: 23,
        contractorType: "Hardwood",
        workDate: "Oct 5-12, 2023"
        }
    },
    {
        id: 'DSB-12',
        title: 'Tile Installation',
        type: 'story',
        status: 'SCHEDULED',
        timeframe: { start: '2023-10-13', end: '2023-10-20' },
        color: 'bg-green-500',
        description: 'Install tile flooring in bathrooms and kitchen',
        isContractor: true,
        contractor: {
        name: "Maria Rodriguez",
        phone: "(555) 456-7890",
        email: "maria.r@example.com",
        company: "Premier Tile",
        rating: 4.7,
        reviews: 41,
        contractorType: "Ceramic Tile",
        workDate: "Oct 13-20, 2023"
        }
    }
    ]
},
{
    id: 'DSB-5',
    title: 'Epic 5',
    type: 'epic',
    status: '',
    timeframe: { start: '2023-10-15', end: '2023-11-10' },
    expanded: false,
    color: 'bg-purple-500',
    barColor: 'bg-red-400',
    children: []
},
{
    id: 'DSB-6',
    title: 'Epic 6',
    type: 'epic',
    status: '',
    timeframe: { start: '2023-11-01', end: '2023-11-20' },
    expanded: false,
    color: 'bg-purple-500',
    barColor: 'bg-purple-500',
    children: []
},
{
    id: 'DSB-7',
    title: 'Epic 7',
    type: 'epic',
    status: '',
    timeframe: { start: '2023-11-15', end: '2023-12-05' },
    expanded: false,
    color: 'bg-purple-500',
    barColor: 'bg-yellow-400',
    children: []
}
]);

// Generate time labels based on zoom level
const generateTimeLabels = () => {
const labels = [];
let currentDate = new Date(viewStart);
const endDate = new Date(viewEnd);

if (zoomLevel === 1) {
    // Months view
    while (currentDate <= endDate) {
    const monthName = new Date(currentDate).toLocaleString('default', { month: 'short' }).toUpperCase();
    labels.push({
        label: monthName,
        date: new Date(currentDate),
        isMainDivider: true,
        position: currentDate.getTime()
    });
    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    }
} else if (zoomLevel === 2) {
    // Weeks view
    let weekCount = 0;
    let currentMonth = -1;
    
    while (currentDate <= endDate) {
    const month = currentDate.getMonth();
    // Reset week counter when month changes
    if (month !== currentMonth) {
        weekCount = 1;
        currentMonth = month;
    } else {
        weekCount++;
    }
    
    const monthName = new Date(currentDate).toLocaleString('default', { month: 'short' }).toUpperCase();
    
    // First week of month gets a main divider
    const isFirstWeekOfMonth = weekCount === 1;
    
    labels.push({
        label: `${isFirstWeekOfMonth ? monthName + ' ' : ''}W${weekCount}`,
        date: new Date(currentDate),
        isMainDivider: isFirstWeekOfMonth,
        position: currentDate.getTime()
    });
    
    // Move to next week
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
    }
} else if (zoomLevel === 3) {
    // Days view
    while (currentDate <= endDate) {
    const day = currentDate.getDate();
    const monthName = new Date(currentDate).toLocaleString('default', { month: 'short' }).toUpperCase();
    
    // First day of month gets a main divider
    const isFirstDayOfMonth = day === 1;
    
    labels.push({
        label: `${day}`,
        date: new Date(currentDate),
        isMainDivider: isFirstDayOfMonth,
        monthLabel: isFirstDayOfMonth ? monthName : null, // Show month name on first day
        position: currentDate.getTime()
    });
    
    // Move to next day
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
} else if (zoomLevel === 4) {
    // 3-day detailed view (showing hours)
    // First determine the visible 3-day window based on timeline center position
    let visibleStartDate = new Date(viewStart);
    if (calendarContainerRef.current) {
    const scrollLeft = calendarContainerRef.current.scrollLeft;
    const containerWidth = calendarContainerRef.current.clientWidth;
    const scrollWidth = calendarContainerRef.current.scrollWidth;
    
    // Calculate the center point of the current view
    const viewPosition = (scrollLeft + (containerWidth / 2)) / scrollWidth;
    
    // Calculate the date at the center of the current view
    const totalTimeSpan = viewEnd.getTime() - viewStart.getTime();
    const centerTime = viewStart.getTime() + (totalTimeSpan * viewPosition);
    const centerDate = new Date(centerTime);
    
    // Set the 3-day window centered on this date
    visibleStartDate = new Date(centerDate);
    visibleStartDate.setDate(centerDate.getDate() - 1);
    }
    
    // Set end date 3 days from start
    const visibleEndDate = new Date(visibleStartDate);
    visibleEndDate.setDate(visibleStartDate.getDate() + 3);
    
    // Generate labels for each hour of the 3-day period
    currentDate = new Date(visibleStartDate);
    currentDate.setHours(0, 0, 0, 0); // Start at midnight
    
    while (currentDate < visibleEndDate) {
    const hour = currentDate.getHours();
    const day = currentDate.getDate();
    const monthName = new Date(currentDate).toLocaleString('default', { month: 'short' }).toUpperCase();
    
    // Main divider for midnight (start of day)
    const isMidnight = hour === 0;
    
    // Format the label
    let hourLabel = '';
    if (hour === 0) {
        // Midnight - show day and month
        hourLabel = `${monthName} ${day}`;
    } else if (hour === 12) {
        // Noon
        hourLabel = '12 PM';
    } else if (hour === 0) {
        // Midnight
        hourLabel = '12 AM';
    } else if (hour > 12) {
        // PM
        hourLabel = `${hour - 12} PM`;
    } else {
        // AM
        hourLabel = `${hour} AM`;
    }
    
    labels.push({
        label: hourLabel,
        date: new Date(currentDate),
        isMainDivider: isMidnight,
        monthLabel: isMidnight ? monthName : null,
        position: currentDate.getTime(),
        isHour: true
    });
    
    // Move to next hour
    currentDate = new Date(currentDate.setHours(currentDate.getHours() + 2)); // Every 2 hours
    }
}

return labels;
};

const timeLabels = generateTimeLabels();

// Calculate column width based on zoom level and labels count
const getColumnWidth = () => {
const labelCount = timeLabels.length;

// Use a more controlled scale factor to prevent excessive zooming
const scaleFactor = zoomLevel === 4 ? (timeScale / 150) : (timeScale / 100);

// Base width as percentage of total view with bounds to prevent extreme scaling
return Math.min((100 / labelCount) * scaleFactor, 20);
};

// Mouse event handlers for dragging
const handleMouseDown = (e: React.MouseEvent) => {
if (!calendarContainerRef.current) return;

setIsDragging(true);
setStartX(e.pageX - calendarContainerRef.current.offsetLeft);
setScrollLeft(calendarContainerRef.current.scrollLeft);

// Prevent default to avoid text selection during drag
e.preventDefault();

// Change cursor to grabbing
if (calendarContainerRef.current) {
    calendarContainerRef.current.style.cursor = 'grabbing';
}
};

const handleMouseMove = (e: React.MouseEvent) => {
if (!isDragging || !calendarContainerRef.current) return;

e.preventDefault();
const x = e.pageX - calendarContainerRef.current.offsetLeft;
const walk = (x - startX) * 2; // Scroll speed multiplier
const newScrollLeft = scrollLeft - walk;

// Update immediately (fixes delayed update issue)
calendarContainerRef.current.scrollLeft = newScrollLeft;

// Sync the timeline content with header scrolling
if (timelineContentRef.current) {
    timelineContentRef.current.style.transform = `translateX(-${calendarContainerRef.current.scrollLeft}px)`;
}
};

const handleMouseUp = () => {
setIsDragging(false);

// Change cursor back to grab
if (calendarContainerRef.current) {
    calendarContainerRef.current.style.cursor = 'grab';
}
};

// Handle zoom with wheel event
const handleWheel = (e: React.WheelEvent) => {
// Prevent the default scroll behavior of the page
e.preventDefault();

// Determine zoom direction
const zoomIn = e.deltaY < 0;

// Save current view position before changing zoom
let viewPosition = 0;

if (calendarContainerRef.current) {
    const scrollLeft = calendarContainerRef.current.scrollLeft;
    const offsetWidth = calendarContainerRef.current.offsetWidth;
    const scrollWidth = calendarContainerRef.current.scrollWidth;
    
    // Calculate the center of the current view as a percentage of the total timeline
    viewPosition = (scrollLeft + offsetWidth / 2) / scrollWidth;
}

// Update state based on zoom direction
if (zoomIn) {
    // Zoom in logic with smooth transitions
    if (zoomLevel === 1 && timeScale < 250) {
    // First level - increase scale within months view
    setTimeScale(prev => Math.min(prev + 25, 250));
    } else if (zoomLevel === 1 && timeScale >= 250) {
    // Transition to weeks view
    setZoomLevel(2);
    setTimeScale(100);
    } else if (zoomLevel === 2 && timeScale < 250) {
    // Second level - increase scale within weeks view
    setTimeScale(prev => Math.min(prev + 25, 250));
    } else if (zoomLevel === 2 && timeScale >= 250) {
    // Transition to days view
    setZoomLevel(3);
    setTimeScale(100);
    } else if (zoomLevel === 3 && timeScale < 250) {
    // Third level - increase scale within days view
    setTimeScale(prev => Math.min(prev + 25, 250));
    } else if (zoomLevel === 3 && timeScale >= 250) {
    // Transition to 3-day detailed view
    setZoomLevel(4);
    setTimeScale(100);
    } else if (zoomLevel === 4) {
    // At maximum zoom, just increase scale slightly
    setTimeScale(prev => Math.min(prev + 10, 200));
    }
} else {
    // Zoom out logic
    if (zoomLevel === 4 && timeScale > 100) {
    // Decrease scale in 3-day view
    setTimeScale(prev => Math.max(prev - 10, 100));
    } else if (zoomLevel === 4 && timeScale <= 100) {
    // Transition back to days view
    setZoomLevel(3);
    setTimeScale(250);
    } else if (zoomLevel === 3 && timeScale > 100) {
    // Decrease scale in days view
    setTimeScale(prev => Math.max(prev - 25, 100));
    } else if (zoomLevel === 3 && timeScale <= 100) {
    // Transition to weeks view
    setZoomLevel(2);
    setTimeScale(250);
    } else if (zoomLevel === 2 && timeScale > 100) {
    // Decrease scale in weeks view
    setTimeScale(prev => Math.max(prev - 25, 100));
    } else if (zoomLevel === 2 && timeScale <= 100) {
    // Transition to months view
    setZoomLevel(1);
    setTimeScale(250);
    } else if (zoomLevel === 1 && timeScale > 100) {
    // Decrease scale in months view
    setTimeScale(prev => Math.max(prev - 25, 100));
    }
}

// After state updates, ensure the same date is centered in the view
setTimeout(() => {
    if (calendarContainerRef.current) {
    const newScrollWidth = calendarContainerRef.current.scrollWidth;
    const newOffsetWidth = calendarContainerRef.current.offsetWidth;
    const newScrollLeft = (viewPosition * newScrollWidth) - (newOffsetWidth / 2);
    
    // Apply the scroll position
    calendarContainerRef.current.scrollLeft = newScrollLeft;
    
    // Sync the timeline content
    if (timelineContentRef.current) {
        timelineContentRef.current.style.transform = `translateX(-${newScrollLeft}px)`;
    }
    }
}, 10);
};

// Toggle expand/collapse of an epic
const toggleExpand = (id: string) => {
setReleases(releases.map(release => 
    release.id === id ? { ...release, expanded: !release.expanded } : release
));
};

// Handle form input changes
const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
if (name === 'start' || name === 'end') {
    setNewEpic({
    ...newEpic,
    timeframe: {
        ...newEpic.timeframe,
        [name]: value
    }
    });
} else {
    setNewEpic({
    ...newEpic,
    [name]: value
    });
}
};

// Handle color selection
const handleColorSelect = (color: string) => {
setNewEpic({
    ...newEpic,
    barColor: color
});
};

// Add new epic to the timeline
const addEpic = (e: React.FormEvent) => {
e.preventDefault();

// Validate form
if (!newEpic.id || !newEpic.title || !newEpic.timeframe.start || !newEpic.timeframe.end) {
    alert('Please fill in all required fields');
    return;
}

// Create new epic object
const epic = {
    id: newEpic.id,
    title: newEpic.title,
    type: 'epic',
    status: '',
    timeframe: newEpic.timeframe,
    expanded: false,
    color: 'bg-purple-500',
    barColor: newEpic.barColor,
    children: [],
    description: 'New epic description'  // Default description
};

// Add to releases state
setReleases([...releases, epic]);

// Reset form
setNewEpic({
    id: '',
    title: '',
    timeframe: { start: '', end: '' },
    barColor: 'bg-purple-500'
});

// Hide form
setShowAddForm(false);
};

// Show tooltip with fixed positioning relative to mouse position
const showTooltip = (e: React.MouseEvent, item: any) => {
// Format dates for display
const startDate = new Date(item.timeframe.start).toLocaleDateString();
const endDate = new Date(item.timeframe.end).toLocaleDateString();

// Get the position coordinates for the tooltip (viewport-relative)
// Use mouse position rather than center of bar
const mouseX = e.clientX;
const mouseY = e.clientY;

// Check if this is a contractor task
const isContractor = item.isContractor || false;

// Set tooltip content and position
setTooltip({
    visible: true,
    content: {
    id: item.id,
    title: item.title,
    type: item.type,
    status: item.status || 'Not started',
    timeframe: { start: startDate, end: endDate },
    assignedTo: item.assignedTo || 'Unassigned',
    description: item.description || 'No description provided',
    contractor: item.contractor
    },
    position: { x: mouseX, y: mouseY + 20 }, // Position slightly below mouse cursor
    isContractor
});
};

// Hide tooltip when mouse leaves
const hideTooltip = () => {
setTooltip({
    ...tooltip,
    visible: false
});
};

// Calculate position and width of timeline bars based on dates and zoom
const calculateBarStyle = (timeframe: { start: string, end: string }) => {
const startDate = new Date(timeframe.start);
const endDate = new Date(timeframe.end);
const timeSpan = endDate.getTime() - startDate.getTime();
const viewSpan = viewEnd.getTime() - viewStart.getTime();

// Calculate position from left
const leftPos = ((startDate.getTime() - viewStart.getTime()) / viewSpan) * 100;

// Calculate width as percentage
const width = (timeSpan / viewSpan) * 100;

return {
    left: `${leftPos}%`,
    width: `${width}%`
};
};

// Render tooltip with fixed positioning
const renderTooltip = () => {
if (!tooltip.visible || !tooltip.content) return null;

return (
    <div 
    className="fixed z-50 bg-white rounded shadow-lg border border-gray-200"
    style={{
        left: `${tooltip.position.x}px`,
        top: `${tooltip.position.y}px`,
        transform: 'translate(-50%, 0)',
        opacity: 0,
        animation: 'tooltipFadeIn 0.3s forwards',
        maxWidth: '300px'
    }}
    >
    {tooltip.isContractor ? (
        <ContractorCard contractor={tooltip.content.contractor} />
    ) : (
        <div className="p-3 w-64">
        <div className="flex justify-between items-start mb-2">
            <div>
            <span className="text-xs font-semibold text-gray-500">{tooltip.content.id}</span>
            <h4 className="font-medium">{tooltip.content.title}</h4>
            </div>
            <span className="text-xs uppercase px-2 py-1 rounded bg-gray-100 text-gray-800">
            {tooltip.content.type}
            </span>
        </div>
        
        <div className="mb-2">
            <div className="flex justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium">{tooltip.content.status}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-600">Start:</span>
            <span>{tooltip.content.timeframe.start}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-600">End:</span>
            <span>{tooltip.content.timeframe.end}</span>
            </div>
            <div className="flex justify-between text-sm">
            <span className="text-gray-600">Assigned to:</span>
            <span>{tooltip.content.assignedTo}</span>
            </div>
        </div>
        
        <div className="text-sm border-t pt-2 mt-2">
            <p className="text-gray-600">{tooltip.content.description}</p>
        </div>
        </div>
    )}
    </div>
);
};

// Current date marker (orange vertical line)
const today = new Date('2023-09-15'); // Setting a fixed date for the demo
const todayPosition = ((today.getTime() - viewStart.getTime()) / (viewEnd.getTime() - viewStart.getTime())) * 100;

// Contractor Card Component
const ContractorCard = ({ contractor }: { contractor: any }) => {
return (
    <div className="bg-white rounded p-4 w-64">
    {/* Top section with profile image and primary info */}
    <div className="flex items-center space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
        <Image 
            src="/user-svgrepo-com.png" 
            alt={`${contractor.name} profile`} 
            className="w-16 h-16 rounded-full object-cover"
            height={80}
            width={80}
        />
        </div>
        
        {/* Primary Contractor Info */}
        <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{contractor.name}</h3>
        
        <div className="mt-1 space-y-1">
            {/* Company */}
            <div className="text-sm text-gray-600">
            <span>{contractor.company}</span>
            </div>
            
            {/* Reviews */}
            <div className="flex items-center text-sm">
            <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
            <span className="font-medium">{contractor.rating}</span>
            <span className="text-gray-600 ml-1">({contractor.reviews} reviews)</span>
            </div>
        </div>
        </div>
    </div>
    
    {/* Secondary info - email and phone */}
    <div className="mt-3 space-y-2">
        {/* Phone */}
        <div className="flex items-center text-sm text-gray-600">
        <Phone size={16} className="mr-2 text-gray-500" />
        <span>{contractor.phone}</span>
        </div>
        
        {/* Email */}
        <div className="flex items-center text-sm text-gray-600">
        <Mail size={16} className="mr-2 text-gray-500" />
        <span>{contractor.email}</span>
        </div>
    </div>
    
    {/* Contractor Type */}
    <div className="mt-4 flex justify-center">
        <div 
        className={`px-5 py-1 rounded-full ${bubbleColors[colorIndex].bg} ${bubbleColors[colorIndex].text} text-xs font-medium min-w-24 text-center`}
        >
        {contractor.contractorType}
        </div>
    </div>
    
    {/* Work Date */}
    <div className="mt-3">
        <div className="flex justify-center">
        <div className="flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-medium">
            <Calendar size={14} className="mr-1" />
            <span>{contractor.workDate}</span>
        </div>
        </div>
    </div>
    </div>
);
};

// Calculate row heights and positions for timeline items
const calculateTimelineRows = () => {
const rows: { item: any, top: number, type: 'epic' | 'child', index: number }[] = [];
let currentTop = 0;

releases.forEach((epic, epicIndex) => {
    // Add epic row
    rows.push({
    item: epic,
    top: currentTop,
    type: 'epic',
    index: epicIndex
    });
    
    currentTop += 40; // Standard row height
    
    // Add child rows if expanded
    if (epic.expanded && epic.children.length > 0) {
    epic.children.forEach((child, childIndex) => {
        rows.push({
        item: child,
        top: currentTop,
        type: 'child',
        index: childIndex
        });
        
        currentTop += 40;
    });
    }
});

return { rows, totalHeight: currentTop };
};

const { rows: timelineRows, totalHeight } = calculateTimelineRows();

return (
<div 
    className="w-full mx-auto bg-white rounded shadow relative timeline-container overflow-hidden" 
    ref={timelineRef}
>
    {/* Render tooltip */}
    {renderTooltip()}
    
    <div className="flex flex-col">
    {/* Header with month names - stays fixed during horizontal scroll */}
    <div className="flex border-b sticky top-0 bg-white z-10">
        <div className="w-1/3 py-2 px-4 font-semibold text-gray-500">
        Releases
        </div>
        <div 
        className="w-2/3 overflow-hidden relative"
        style={{ cursor: 'grab' }}
        >
        <div 
            className="overflow-x-auto hide-scrollbar"
            ref={calendarContainerRef}
            style={{ 
            overflowY: 'hidden',
            maxWidth: '100%'
            }}
        >
            <div
            className="flex relative"
            style={{ 
                width: `${Math.min(timeScale, 250)}%`, 
                minWidth: '100%'
            }}
            >
            {/* Time period dividers */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
                {timeLabels.map((item, index) => (
                <div 
                    key={`divider-${index}`}
                    className={`h-full ${item.isMainDivider ? 'border-l-2 border-gray-300' : 'border-l border-gray-200'}`}
                    style={{ 
                    position: 'absolute',
                    left: `${(index / timeLabels.length) * 100}%`, 
                    height: '100%'
                    }}
                />
                ))}
            </div>
            
            {/* Time labels */}
                                {timeLabels.map((item, index) => (
                <div 
                key={`label-${index}`}
                className="py-2 text-center font-semibold text-gray-500 whitespace-nowrap relative"
                style={{ 
                    width: `${getColumnWidth()}%`, 
                    minWidth: zoomLevel === 4 ? '20px' : zoomLevel === 3 ? '30px' : zoomLevel === 2 ? '60px' : '80px'
                }}
                >
                <div className={`${item.isMainDivider ? 'font-bold' : 'font-normal'}`}>
                    {zoomLevel === 3 && item.monthLabel ? (
                    <div>
                        <div className="text-xs text-gray-400">{item.monthLabel}</div>
                        <div>{item.label}</div>
                    </div>
                    ) : zoomLevel === 4 && item.isMainDivider ? (
                    <div>
                        <div className="text-xs text-gray-400">{item.monthLabel}</div>
                        <div>{item.label}</div>
                    </div>
                    ) : (
                    item.label
                    )}
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
    
    {/* Timeline content with synchronized scrolling */}
    <div className="flex flex-1 w-full" onWheel={(e) => {
        // Prevent page scroll when interacting with timeline
        e.preventDefault();
        handleWheel(e);
    }}>
        {/* Left static column: Releases list */}
        <div className="w-1/3 overflow-y-auto border-r" style={{ maxHeight: '600px' }}>
        {timelineRows.map((row, rowIndex) => {
            if (row.type === 'epic') {
            const epic = row.item;
            return (
                <div 
                key={`list-${epic.id}`} 
                className="py-2 px-4 border-b hover:bg-gray-50 flex items-center h-10"
                >
                <button 
                    onClick={() => toggleExpand(epic.id)}
                    className="mr-2 w-6 h-6 flex items-center justify-center text-gray-400"
                >
                    {epic.children.length > 0 && (
                    epic.expanded ? 
                    <span>▼</span> : 
                    <span>▶</span>
                    )}
                </button>
                <div className={`w-4 h-4 rounded ${epic.color} mr-2`}></div>
                <span className="text-gray-500 mr-2">{epic.id}</span>
                <span className="font-medium truncate">{epic.title}</span>
                {epic.status && (
                    <span className="ml-auto text-green-600 text-sm font-medium">
                    {epic.status}
                    </span>
                )}
                </div>
            );
            } else {
            const child = row.item;
            return (
                <div 
                key={`list-child-${child.id}`} 
                className="py-2 pl-12 pr-4 border-b bg-gray-50 flex items-center h-10"
                >
                <div className={`w-4 h-4 ${child.color} mr-2`}></div>
                <span className="text-gray-500 mr-2">{child.id}</span>
                <span className="font-medium truncate">{child.title}</span>
                {child.status && (
                    <span 
                    className={`ml-auto text-sm font-medium ${
                        child.status === 'DONE' ? 'text-green-600' : 
                        child.status === 'IN PROGRESS' ? 'text-blue-600' : 
                        child.status === 'SCHEDULED' ? 'text-amber-600' : ''
                    }`}
                    >
                    {child.status}
                    </span>
                )}
                </div>
            );
            }
        })}
        
        {/* Add Epic button */}
        <div className="py-3 px-4 border-b">
            <button 
            className="flex items-center text-blue-500 hover:text-blue-700"
            onClick={() => setShowAddForm(!showAddForm)}
            >
            <span className="text-xl mr-1">+</span>
            <span>Create Epic</span>
            </button>
        </div>
        </div>
        
        {/* Right scrollable column: Timeline */}
        <div className="w-2/3 overflow-hidden relative">
        {/* Container for timeline content */}
        <div
            className="overflow-x-auto hide-scrollbar"
            style={{ maxHeight: '600px', cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={(e) => {
            // Prevent page scroll when interacting with timeline
            e.preventDefault();
            handleWheel(e);
            }}
        >
            {/* Today marker - absolute positioned relative to the timeline content */}
            <div 
            className="absolute top-0 bottom-0 w-0.5 bg-orange-400 z-10" 
            style={{ 
                left: `${todayPosition}%`,
                height: `${totalHeight}px`
            }}
            />
            
            {/* Scrollable timeline content */}
            <div
            className="relative"
            style={{ 
                width: `${Math.min(timeScale, 250)}%`, 
                minWidth: '100%',
                height: `${totalHeight}px`
            }}
            ref={timelineContentRef}
            >
            {/* Background grid */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                {/* Horizontal grid lines */}
                {timelineRows.map((row, idx) => (
                <div 
                    key={`hgrid-${idx}`} 
                    className="border-b border-gray-100" 
                    style={{ top: `${row.top + 39}px`, position: 'absolute', width: '100%' }}
                />
                ))}
                
            {/* Vertical dividers (time periods) - exactly matching the header dividers */}
                {timeLabels.map((item, idx) => (
                <div 
                    key={`vgrid-${idx}`}
                    className={`absolute ${item.isMainDivider ? 'border-l-2 border-gray-300' : 'border-l border-gray-200'}`}
                    style={{ 
                    position: 'absolute',
                    left: `${(idx / timeLabels.length) * 100}%`,
                    top: '0',
                    height: '100%'
                    }}
                />
                ))}
            </div>
            
            {/* Timeline items */}
            {timelineRows.map((row, idx) => {
                const item = row.item;
                
                if (row.type === 'epic') {
                // Epic bar
                return (
                    <div 
                    key={`bar-${item.id}`}
                    className={`absolute rounded-sm transition-all ${item.barColor}`}
                    style={{
                        ...calculateBarStyle(item.timeframe),
                        top: `${row.top + 7}px`,
                        height: '26px'
                    }}
                    onMouseEnter={(e) => showTooltip(e, item)}
                    onMouseLeave={hideTooltip}
                    />
                );
                } else {
                // Child item bar
                return (
                    <div 
                    key={`bar-child-${item.id}`}
                    className={`absolute rounded-sm transition-all ${item.isContractor ? 'bg-amber-400' : 'bg-gray-300'}`}
                    style={{
                        ...calculateBarStyle(item.timeframe),
                        top: `${row.top + 13}px`,
                        height: '14px'
                    }}
                    onMouseEnter={(e) => showTooltip(e, item)}
                    onMouseLeave={hideTooltip}
                    />
                );
                }
            })}
            </div>
        </div>
        </div>
    </div>
    </div>
    
    {/* Add Epic Form */}
    {showAddForm && (
    <div className="border-t p-4 bg-gray-50">
        <h3 className="font-medium mb-3">Create New Epic</h3>
        <form onSubmit={addEpic} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Epic ID
            </label>
            <input
                type="text"
                name="id"
                value={newEpic.id}
                onChange={handleInputChange}
                placeholder="e.g. DSB-8"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Epic Title
            </label>
            <input
                type="text"
                name="title"
                value={newEpic.title}
                onChange={handleInputChange}
                placeholder="e.g. Epic 8"
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
            />
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
            </label>
            <input
                type="date"
                name="start"
                value={newEpic.timeframe.start}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
            </label>
            <input
                type="date"
                name="end"
                value={newEpic.timeframe.end}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
            />
            </div>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
            </label>
            <div className="flex space-x-2">
            <button 
                type="button" 
                className={`w-8 h-8 rounded-full bg-purple-500 ${newEpic.barColor === 'bg-purple-500' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                onClick={() => handleColorSelect('bg-purple-500')}
            />
            <button 
                type="button" 
                className={`w-8 h-8 rounded-full bg-red-400 ${newEpic.barColor === 'bg-red-400' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                onClick={() => handleColorSelect('bg-red-400')}
            />
            <button 
                type="button" 
                className={`w-8 h-8 rounded-full bg-yellow-400 ${newEpic.barColor === 'bg-yellow-400' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                onClick={() => handleColorSelect('bg-yellow-400')}
            />
            <button 
                type="button" 
                className={`w-8 h-8 rounded-full bg-blue-400 ${newEpic.barColor === 'bg-blue-400' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                onClick={() => handleColorSelect('bg-blue-400')}
            />
            <button 
                type="button" 
                className={`w-8 h-8 rounded-full bg-green-500 ${newEpic.barColor === 'bg-green-500' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                onClick={() => handleColorSelect('bg-green-500')}
            />
            </div>
        </div>
        
        <div className="flex justify-end space-x-2">
            <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
            Cancel
            </button>
            <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
            >
            Add Epic
            </button>
        </div>
        </form>
    </div>
    )}
    
    {/* Add CSS for hiding scrollbars but keeping functionality */}
    <style jsx>{`
    .hide-scrollbar {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }
    .hide-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
    `}</style>
</div>
);
};

export default ReleaseTimeline;