# New-Grad Salary Data Display

To install dependencies and run:
```
npm install
npm install -g gulp nodemon
npm start
```

To have gulp recompile the files in the src directory, use
```
gulp
```

You will need to create a ``config.json`` file in the root directory. The json object in the ``config.json`` file must have four fields:
```
{
  "FACEBOOK_APP_ID": "[Insert FB app ID here]",
  "FACEBOOK_APP_SECRET": "[Insert FB app secret here]",
  "HOST": "http://localhost:3000/",
  "APP_SECRET": "[Insert any app secret here]"
}
```
Note that you will need to create a Facebook app on your own Facebook developer account and put your own app ID and app secret in the ``config.json`` file. The callback URL is ``[Base URL]/auth/facebook``.

Also note that you should use localhost when running locally, but if you decide to host a new instance of the app somewhere, change the ``HOST`` field to the production host URL.

