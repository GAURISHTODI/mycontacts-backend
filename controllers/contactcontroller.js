const asyncHandler = require("express-async-handler")// when some error will occur,
// this will automatically pass it to the error handler (this is part-2, mongoDB setup karne ke pehle)

// label dena zaruri hai while creating API methods (part-1)

//Contact Schema 
const contactModel = require("../models/contactModel")

// @desc GET all contacts
// @route GET api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contactModel.find({ user_id: req.user.id})
    if (!contacts) {
        res.status(404);
        throw new Error("Contacts not found")
    }
    res.status(200).json(contacts)
})

// @desc Create new contact
// @route POST api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body)
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Abe yaar");
    }
    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id

    })
    res.status(201).json(contact)
})

// @desc Update a contact
// @route PUT api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {  
    const individualContact = await contactModel.findById(req.params.id) 
    if (!individualContact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (individualContact.user_id.toString() !== req.user.id) {
        res.status(402);
        throw new Error("can't make changes in other user's account");
    }
    const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    );// req.params.id is older which is coming, req.body is the new body which i have to update, third is query option , new: true
    
        res.status(200).json(updatedContact)
    })


// @desc Get individual contact
// @route GET api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    const individualContact = await contactModel.findById(req.params.id
    ) 
    if (!individualContact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(individualContact);
})


// @desc Delete individual contact
// @route DELETE api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const individualContact = await contactModel.findById(req.params.id);
    if (!individualContact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (individualContact.user_id.toString() !== req.user.id) {
        res.status(402);
        throw new Error("can't make changes in other user's account")
    }
    await individualContact.deleteOne({_id: req.params.id});
    res.status(204).json(individualContact)
    console.log("Done deletion")
    })

 

module.exports ={getContacts, createContact, updateContact,getContact,deleteContact}
