import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
import QRCode from "qrcode";

/**
 * This method takes values in request body
 * and saves the contact
 * @route POST /api/contacts
 * @body { profile, firstname, lastname, number, gender, address }.
 * @returns {object} - A a success response.
 * @throws {error} - If failes to save contact.
 * @access Private
 */
const createContact = asyncHandler(async (req, res) => {
  const { profile, firstname, lastname, number, gender, address } = req.body;
  const createdBy = req.user._id;

  if (!firstname || !number) {
    res.status(400);
    throw new Error("Please send valid data");
  }

  const contactExists = await Contact.findOne({ number });

  if (contactExists) {
    res.status(400);
    throw new Error("Contact with this number already exists");
  }

  const contact = await Contact.create({
    profile,
    firstname,
    lastname,
    number,
    gender,
    address,
    createdBy,
  });

  await QRCode.toFile(`qrcodes/${contact._id}.png`,process.env.FRONTEND_URL + `/contacts/${contact._id}`)

  if (contact) {
    res.status(201).json({
      code: 201,
      remark: "contact created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid contact data");
  }
});



/**
 * This method return list of all contacts
 * @route GET /api/contacts
 * @body { profile, firstname, lastname, number, gender, address }.
 * @returns {object} - A a success response.
 * @throws {error} - If failes to save contact.
 * @access Private
 */
const getContactList = asyncHandler(async (req, res) => {
  try {

    const count = await Contact.countDocuments();

    const contacts = await Contact.find();

    res.status(200).json({ 
      code: 200,
      remark: "success",
      data:{
        contactList: contacts,
        totalContacts: count,
      }
     });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});


export { createContact , getContactList};
