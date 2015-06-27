#HackTheVisual submission: cctv-me! 

Who needs a selfie? We're creating an app which will provide a new perspective to your selfies!

Picture the world, you're standing in a tourist lcoation taking a picture of yourself and your loved ones.  But what if you want more?

Now you can! Use public cameras to see yourselves from a new perspective!

Follow yourself around your favourite attractions, show more than your selfie and add depth and context to your memories!


## What are we using and how?

We're using your mobile phone to detect your location, and use evercam.io to find any public or accessible private available cameras nearby to take pictures of you from a distance, in the context of where you are.

## Cordova Packages

Device orientation is used for heading but always has a value of 0 a the moment.

It throws an error on computer.

'''
cordova plugins add org.apache.cordova.geolocation
cordova plugins add org.apache.cordova.device-orientation
cordova plugins ls
'''

## Config file

API credentials are stored in a local config.json file, which needs to be located at

```
www/config.json
```

This should include the following:

```json
{
  "evercam_api_id": "[api id]",
  "evercam_api_secret": "[api secret]",
  "mapbox_map_id": "[mapbox map id]",
  "mapbox_api_token": "[mapbox api token]"
}
```