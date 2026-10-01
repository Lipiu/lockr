export interface UserDto {
    id: string;
    email: string;
    createdAt: string;
}

export interface FormInputData {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
}