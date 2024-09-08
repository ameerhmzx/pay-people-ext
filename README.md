# Pay People Extension

> NOTE: This is not an official extension from Pay People. This is a personal project that I created for my own use. I
> am not affiliated with Pay People in any way.

This is a browser extension that helps you in daily chores of clocking in and out of your work.
And filling the timesheet.

## Prominent Features

1. **Clock In/Out**: You can clock in and out of your work with a single click.
2. **Auto-fill Timesheet**: You can fill the timesheet before clocking out. The extension will automatically fill the
   timesheet for you.
3. **Keeps you logged in**: The extension will save your login credentials and keep you logged in even if your session
   expires.
4. **Auto login**: The extension will automatically log you in when you open the Pay People.

## Technologies Used

1. [**WXT**](https://wxt.dev/): The extension is built using Web Extension Toolkit.
2. **React**: The popup of the extension is built using React.
3. **Tailwind** & **Next UI**: for basic UI needs.
4. **Tanstack Query**: to manage API calls.
5. **Tanstack Router**: for routing within the extension.
6. **BUN**: Why not?

## How to install

Even I don't yet :P

## If you want to contribute

I am open to contributions. Feel free to fork the project and submit a PR.
There are a lot of things that can be improved. Some of them are:

1. **Use a common fetch / axios client**: I am using `fetch` directly in the code. It would be better to use a common
   client.
2. **Indicate if clocked in or not**: A small indicator on the extension icon to show if you are clocked in or not.
3. **Auto select last submitted Project for the timesheet dropdown**: The extension can remember the last project you
   submitted the timesheet for and auto-select it for the next time.

## Run Locally

1. Clone the project
2. Install dependencies
   ```bash
   bun install
   ```
3. Start the development server
   ```bash
   bun dev
   ```
4. Watch routes (Tanstack's file based router for popup)
   ```bash
   bun watch-routes
   ```
