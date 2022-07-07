// import ImageKit from 'imagekit-javascript';
const ImageKit = require('imagekit-javascript');
const uuid = require('uuidjs');
const IMAGEKITID = 'a5s6vkjfr';
const PRIVATEID = 'private_OletAB1+rSrxgo+1rrLnj6tJh9k=';

// import path from 'path';
// import 'dotenv';

// dotenv.config({ path: './.env' });

// console.log(process.env.IMAGEKITID);

export const postImage = async (base64, fileName) => {
  // SDK initialization
  var imagekit = await new ImageKit({
    publicKey: 'public_pFN7y6sXNimAHOyHqjeRoC6yN0E=',
    // privateKey: `private_OletAB1+rSrxgo+1rrLnj6tJh9k=`,
    urlEndpoint: `https://ik.imagekit.io/a5s6vkjfr/`,
    // authenticationEndpoint: 'http://localhost:3000/signature',
  });

  const newimagekit = new ImageKit({
    publicKey: 'public_pFN7y6sXNimAHOyHqjeRoC6yN0E=',
    privateKey: `private_OletAB1+rSrxgo+1rrLnj6tJh9k=`,
    urlEndpoint: `https://ik.imagekit.io/a5s6vkjfr/`,
  });

  var authenticationParameters = newimagekit.getAuthenticationParameters();
  imagekit.authenticationEndpoint = authenticationParameters;

  // URL generation
  // var imageURL = imagekit.url({
  //   path: `/${fileName}`,
  // });

  // const token = uuid.genV4();
  // const expiration = parseInt(Date.now() / 1000) + 60 * 10; // Default expiration in 10 mins
  // imagekit.getAuthenticationParameters(token, expiration);

  // upload function
  imagekit.upload(
    {
      file: base64,
      fileName: fileName,
      // tags: ['tag1'],
    },
    function (err, result) {
      if (err) console.log(err);
      else console.log(result);
    }
  );
};

// /*
//     SDK initialization
//     authenticationEndpoint is implemented in backedn i.e. server.js file
// */
// var imagekit = new ImageKit({
//   publicKey: 'public_pFN7y6sXNimAHOyHqjeRoC6yN0E=',
//   privateKey: `private_OletAB1+rSrxgo+1rrLnj6tJh9k=`,
//   urlEndpoint: `https://ik.imagekit.io/${process.env.IMAGEKITID}/`,
// });

// // Upload function internally uses the ImageKit.io javascript SDK
// function upload(e) {
//   e.preventDefault();
//   var file = document.getElementById("file");
//   imagekit.upload({
//       file: file.files[0],
//       fileName: file.files[0].name || "sample-file.jpg",
//       tags: ["tag1"], // Comma seperated value of tags
//       responseFields: "tags" // Comma seperated values of fields you want in response e.g. tags, isPrivateFile etc
//   }, function (err, result) {
//       if (err) {
//           alert("Error in file upload. Check console logs for error response");
//           console.log(err);
//       } else {
//           alert("File uploaded. Check console logs for success response");
//           console.log(result);
//       }
//   })
// }
