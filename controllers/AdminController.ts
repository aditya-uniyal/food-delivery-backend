import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const findVendor = async(id: string | undefined, email?: string) => {
     
    if(email) {
        return await Vendor.findOne({email: email});
    } else {
        return await Vendor.findById(id);
    }
}

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    // use Vendor.dto to extract input from the request
    const { name, address, pincode, foodTypes, email, password, ownerName, phone } = <CreateVendorInput>req.body;

    const existingVendor = await findVendor("", email);

    if(existingVendor !== null) {
        return res.json({ "message": "Vendor with this email id already exists."});
    }

    //generate the salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    //encrypt the password using the salt

    const createdVendor = await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodTypes: foodTypes,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: []
    });

    return res.json(createdVendor);
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

    const vendors = await Vendor.find();

    if(vendors !== null) {
        return res.json(vendors);
    }

    return res.json({
        "message": "vendors data not available."
    })
    
}

export const GetVendorByID = async (req: Request, res: Response, next: NextFunction) => {

    const vendorId = req.params.id;
    
    const vendor = await findVendor(vendorId);

    if(vendor !== null) {
        return res.json(vendor);
    }

    return res.json({
        "message": "vendor with this id does not exists."
    });
}