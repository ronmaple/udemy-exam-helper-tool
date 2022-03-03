## udemy exam helper

Tool I personally used to help prepare for an AWS certification exam.

Note: I didn't want to spend more than an hour on this, so the code will be messy.

To run:

1. Navigate to your udemy exam (will upload examples)
2. Open Chrome Dev Tools > Network tab
3. Get data. Usually this will be under filter `?version=`, and copy the response
4. create a folder in `src` : `/secret-data`
5. copy & paste your data, name it whatever you want, and import it. See `import data from 'main-data-0.json'` in App.js for example
6. Install and run app (`npm install` && `npm run start`)

To make modifications:

You can change the filter. (this is under the `useEffect`. If I do improve this in the future, I'll add some customizable filters, etc). For my use case, I wanted to focus on a specific set of topics.