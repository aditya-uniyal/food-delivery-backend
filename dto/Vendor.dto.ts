export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodTypes: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface EditVendorInput {
    name: string;
    address: string;
    phone: string;
    foodTypes: [string];
}

export interface VendorLoginInputs {
    email: string;
    password: string;
}

export interface VendorPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];   
}