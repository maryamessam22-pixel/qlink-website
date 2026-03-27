# Assets Directory

This folder contains all static assets for the Qlink project. 

## Folder Structure:
- `images/`: For general images, background pictures, etc.
- `logos/`: For company logos.
- `icons/`: For small UI icons.
- `videos/`: For any video assets.

When using these assets in your components, you can import them like this:
```javascript
import logo from '../assets/logos/qlink-logo.png';

function MyComponent() {
  return <img src={logo} alt="Qlink Logo" />;
}
```
