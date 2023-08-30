# React Message Queue Challenge

---

## About the Solution

The solution provided shows a few different patterns, which are used for illustrative purposes, and not necessarily optimal for a simple demo app. Any glaring issues or anti-patterns are certainly open for discussion! 🤓

### General

#### Instantiating the `MessageGenerator`

The `MessageGenerator` instance was created outside of the `MessageList` component, and is a simple way to maintain a stable reference through component re-renders. However, since the callback needs access to the component's state, the `messageCallback` method was re-assigned from inside the function body of the component. _Some experimentation was done to put this functionality into a custom hook, but was removed from the final solution._

#### State management

State management was kept simple by using local state for each message type (column) and adding `state` and `setState` properties to each message type object. The `state` and `setState` references were kept stable by storing them in a `Map` outside of the hook and component functions. _Using another state management method implemented with `Context`, `Redux` or `Zustand` would be yet another way to over-engineer a simple demo project._ 😉

### Components

The components are separated into their own directories with an `index.jsx` file containing the component code, and other component-specific files (like `style.css`) included in the directory as well.

### Styling

Styling was tweaked from the original mockup for the 'clear' buttons on each message card as well as the column headers. Animations and transitions were added to help call out new messages as they appear in the lists, as well as offer feedback when clicking the clear/delete button.

Styles are defined where it seems most appropriate. General styling for the entire UI is contained in the `global.css` file in the root of `src`. Component-specific styling is contained in a `css/scss` file in the component folder. For demonstration purposes in this project, a few different 'flavors' of CSS are imported to individual components:

 - Regular `*.css` files
 - SCSS `*.scss` files (`sass` library added for parsing)
 - CSS modules `*.module.css`

### Hooks

In the spirit of over-engineering a solution for a simple demo, a hook called `useMessageType` was created to add basic state management to each message type (message types are defined once inside the `MessageList` component).

### API

Modifications to the API were done to use messages that were pre-generated and stored in a JSON file (this was done to avoid over-use of the `hipsum.com` API). The message objects matched the original API - only the message content was changed.

### Misc.

 - Adding `#devmode` to the end of the url will enable output of additional messages to the browser console for debugging.
 - Additional 'priority' levels can be added by initializing them with the `useMessageType` hook inside the `MessageList` component. To render, add a new `MessageColumn` component and pass a reference to the new message type variable.

<br>
<hr>
<br>

> Instructions from original README are included below for reference.

## Instructions

This code challenge tests your skills in react.js, and modular design.
The purpose of the application is to correctly render a stream of messages coming from an api. Different messages will be coded different colors and require slightly different rendering. The rules are described in detail below.

This challenge already includes an API response. It is not required or expected for you to make any changes to this interaction.

The 3 priorities that we provide you are:
  * 1 = error
  * 2 = warning
  * 3 = info

### Acceptance Criteria

1. Messages should be rendered in a table-like structure. The newest messages should appear at the top of their respective columns.

1. Use the mockup `grid.png` in the root directory. It contains some inconsistencies. Please ensure that your app represents a good faith effort at matching the mockup within reason. We welcome follow up questions if you have them.

1. The messages should be color coded depending on the priority of the message. The appropriate color per priority is:

   * error: `#F56236`
   * warning: `#FCE788`
   * info: `#88FCA3`

2. A user should be able to clear all messages at any point.
3. A user should be able to clear a specific message in a specific column
4. A user should be able to start and stop incoming messages. By default the messages should be running and displaying on the grid. The start/stop button should update depending on the state of the feed.
5. A user should see a count of specific messages in each column
6. Functional components utilizing Hooks are preferred over Class based components.
7. You may use a UI library if you would like.
