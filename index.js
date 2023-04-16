const contactsOperations = require("./contacts");

const { program } = require("commander");
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;
    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with ID ${id} not found`);
      }
      console.table(contact);
      break;
    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.table(newContact);
      break;
    case "remove":
      const removeContact = await contactsOperations.removeContact(id);

      console.table(removeContact);
      break;
    default:
      console.warn(" Unknown action type!");
  }
}
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();
invokeAction(options);
