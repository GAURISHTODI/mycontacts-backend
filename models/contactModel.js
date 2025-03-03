//Schema model for our contacts
const mongoose = require("mongoose")
const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required:[true, "it is compulsory"]
    },
    email: {
        type: String,
        required:[true, "Please add the email"]
    },
    phone: {
        type: String,
        required:[true, "it is compulsory"]
    }
}, {
    timestamps: true,   
 })

module.exports = mongoose.model("contactModel", contactSchema)
//     The timestamps: true option in the schema autosmatically adds two fields to your MongoDB documents:

// createdAt – Records the date and time when the document is first created.
// updatedAt – Updates with the current timestamp whenever the document is modified.
//