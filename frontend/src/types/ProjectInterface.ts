// SHORT PROJECT SUMMARY INTERFACES
// UserType.java enum
enum UserType {
    secretary="SECRETARY",
    technician="TECHNICIAN",
    pojectManager="PROJECT_MANAGER",
    adjuster="ADJUSTER",
    client="CLIENT"
}

// ShortUser.java type
type ShortUser = {
    username: string;
    shortName: string;
    profileImageUrl: string;
    userType: UserType;
    isAvailable: boolean;
}

// ProjectStage.java enum
enum ProjectStage {
    initial="INITIAL",
    inspection="INSPECTION",
    estimate="ESTIMATE",
    remediation="REMEDIATION",
    restoration="RESTORATION",
    completed="COMPLETED"
}

// ShortProjectSummary.java interface
export interface ShortProject { // TODO do we need an ID for the short project???
    address: string;
    assignedUsers: ShortUser;
    stage: ProjectStage;
}

// LONG PROJECT SUMMARY INTERFACES
// LongUser.java type
type LongUser = {
    id: number; // TODO see how long the ID is going to be to see whether we need to use the number or bigInt type
    email: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    currentProjectCount: number;
}

// ProjectType.java enum
enum ProjectType {
    residential="RESIDENTIAL",
    commercial="COMMERCIAL",
    industrial="INDUSTRIAL",
    other="OTHER"
}

// LongProjectSummary.java interface
export interface LongProject extends ShortProject {
    name: string; // is this supposed to be address?
    startDate: string; // from the java.util.LocalDate library
    lossDate: string; // from the java.util.LocalDate library
    owners: LongUser;
    technicians?: LongUser;
    ediorIds?: LongUser;
    viewerIds?: LongUser;
    projectType: ProjectType;
    // stage: ProjectStage; pulled from ShortUser interface
    clientName: string;
    clientEmail: string;
    clientPhone: string;
}