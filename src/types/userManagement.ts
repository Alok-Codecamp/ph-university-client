


export type IGuardian = {

    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation?: string;
    motherContactNo: string;

}
export type IUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;

}
type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type ILocalGurdian = {
    localGuardianName: string;
    localGuardianOccupation: string;
    localGuardianContactNo: string;
}

export type Tstudent = {
    _id: string;
    id: string;
    user: string;
    password: string;
    name: IUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth: string;
    email: string;
    contactNumber: string;
    emergencyContactNo: string;
    bloodGroup?: string[];
    presentAddress: string;
    permanentAddress: string;
    guardian: object;
    localGuardian: object;
    profileImg?: string;
    admissionSemester: string;
    academicDepertment: string;
    isDeleted?: boolean;

}






