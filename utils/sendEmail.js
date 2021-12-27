const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

module.exports.sendEmail = async(email,subject,payload,template)=>{
    try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          // port: 465,
          auth: {
            user: "mugishaisaac2001@gmail.com",
            pass: "0737711087",
          },
        });
    
        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
          return {
            from: "mugishaisaac2001@gmail.com",
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
          };
        };
    
        // Send email
        transporter.sendMail(options(), (error, info) => {
          if (error) {
            console.log(error);
            return error;
          } else {
            return res.status(200).json({
              success: true,
            });
            console.log(info);
          }
        });
      } catch (error) {
        console.log(error);
        return error;
      }
}