import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {Contact} from "../models/models.contact.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerContact = asyncHandler(async (req, res)=>{
  console.log("inside register");
  
      const {name,phoneNumber,address,label}= req.body

    if(!name || name.trim() === ""){
        throw new ApiError(400, "Name is required");
    }
    if(!phoneNumber || phoneNumber.trim() === ""){
        throw new ApiError(400, "Phone Number is required");
    }
    if(phoneNumber.length !==10){
       throw new ApiError(400, "Phone Number should be exactly of 10 digits");
    }

   const avatarLocalPath = req.file?.path;
   const avatar = await uploadOnCloudinary(avatarLocalPath);
   console.log("avatar", avatar);
   
   
   const contact = await Contact.create({
    name,
    avatar:avatar || "",
    phoneNumber,
    address,
    label
   });

   const createdContact = await Contact.findById(contact._id)

   if(!createdContact){
         throw new ApiError(500, "something went wrong while registering user")
   }
   return res.status(201).json(
      new ApiResponse(200, createdContact,"Contact created successfully")
)
})

const updateContactByName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const { phoneNumber, address, label } = req.body;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Name is required to update contact");
  }

 
  const contact = await Contact.findOne({ name: name });

  if (!contact) {
    throw new ApiError(404, "Contact not found with given name");
  }

  if (phoneNumber) contact.phoneNumber = phoneNumber;
  if (address) contact.address = address;
  if (label) contact.label = label;

  await contact.save();

  return res.status(200).json(
    new ApiResponse(200, contact, "Contact updated successfully")
  );
});

const deleteContactByName = asyncHandler(async (req, res) => {
  const { name } = req.params;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Name is required to delete contact");
  }

  const contact = await Contact.findOneAndDelete({ name: name }); 

  if (!contact) {
    throw new ApiError(404, "Contact not found with given name");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Contact deleted successfully")
  );
});


const getContactByName = asyncHandler(async (req, res)=>{
  const {name}= req.params;
   if (!name || name.trim() === "") {
    throw new ApiError(400, "Name is required to delete contact");
  }
 const contact = await Contact.findOne({name:name});
 if (!contact) {
    throw new ApiError(404, "Contact not found with given name");
  }

  return res.status(200).json(
    new ApiResponse(200,  "Contact found successfully", contact,)
  );
})

const getContactsByLabel = asyncHandler(async (req, res) => {
  const { label } = req.params;

  if (!label || label.trim() === "") {
    throw new ApiError(400, "Label is required to find contact");
  }

  const contacts = await Contact.find({ label: label });

  if (contacts.length === 0) {
    throw new ApiError(404, "No contacts found with the given label");
  }

  return res.status(200).json(
    new ApiResponse(200, "Contacts found successfully with the given label", contacts)
  );
});


const toggleBookmark = asyncHandler(async (req, res) => {
  const { name } = req.params;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Name is required to toggle bookmark");
  }

  const contact = await Contact.findOne({ name: name });

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  contact.bookmarked = !contact.bookmarked;
  await contact.save();
  res.status(200).json(contact);
});


 

// const getAllContacts = asyncHandler(async (req, res)=>{
//   const contact = await Contact.
// })
export {registerContact,updateContactByName,deleteContactByName,getContactByName,getContactsByLabel,toggleBookmark}


