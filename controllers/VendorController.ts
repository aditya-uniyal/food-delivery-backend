import { Request, Response, NextFunction } from "express";
import { EditVendorInput, VendorLoginInputs } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utility";
import { findVendor } from "./AdminController";

export const VendorLogin = async(req: Request, res: Response, next: NextFunction) => {

    const {email, password} = <VendorLoginInputs>req.body;

    const existingVendor = await findVendor("", email);

    if(existingVendor !== null) {

        // validation and give access
        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

        if(validation) {

            const signature = GenerateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodTypes,
                name: existingVendor.name 
            });
            return res.json(signature);
        } else {
            return res.json({"message": "incorrect password."});
        }
    }

    return res.json({"message": "invalid login credentials."});
}

export const GetVendorProfile = async(req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user) {

        const existingVendor = await findVendor(user._id);
        return res.json(existingVendor);
    }

    return res.json({"message": "Vendor information not found"});
}

export const UpdateVendorProfile = async(req: Request, res: Response, next: NextFunction) => {
    
    const {name, address, phone, foodTypes} = <EditVendorInput>req.body;
    const user = req.user;

    if(user) {
        const existingVendor = await findVendor(user._id);

        if(existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodTypes = foodTypes;

            const updatedVendor = await existingVendor.save();
            return res.json(updatedVendor);
        }

        return res.json(existingVendor);
    }

    return res.json({"message": "Vendor information not found"});
}

export const UpdateVendorService = async(req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user;

    if(user) {
        const existingVendor = await findVendor(user._id);

        if(existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;

            const updatedVendor = await existingVendor.save();
    
            return res.json(updatedVendor);
        }
    }

    return res.json({"message": "Vendor information not found"});
}