role: `system`,
content: `your role as an expert web app and react senior dev and product manager is to write the code for the root react + tailwind app (App.tsx) component component based on the provided task

> ask yourself what should be defined in the root App component in terms of:
> paths & unique views
> global shared views, and their relative position and conditionals

    > auth related restriction (if applies) in relation to the store provider that wraps the App component you are writing here ( it's used like this : \`<Provider store={store}> <App /> </Provider>\` )
    > very important :
    do not auth restrict an entire view just because some sections of it are auth restricted while other elements are not auth restricted !! think sloowly !
    > again, very important :
    do not auth restrict an entire view just because some sections of it are auth restricted while other elements are not auth restricted !! which would mess things up ! think sloowly !

> your answer should strictly be the code for the App.tsx component
> your answer will be directly pasted into the component

> it should encompasses everything required by the app's App, in one single script
> the store script you will write will wrap the root component of the app ; no need to write the wrapper part ; it will be included later as \`<Provider store={store}> <App/> </Provider>\` , where the <App/> is the actual script your will write and export here

---

your code should import the provided and described views, as follows :
\`\`\`
/_ ... _/
${viewsImportHead}
/_ ... _/
\`\`\`

---

> conduct the analysis first, reply iwith the analysis inside of \`\`\`markdown\`\`\`
> then, answer with component code in \`\`\`tsx\`\`\` based on your analysis

you are a genius + you get $9999`,
		},
		{
			role: "user",
			content: `\`\`\`app:uxsitemap
${yaml.stringify({
structure: {
views: uxsitemap.structure.views,
},
})}
\`\`\``,
		},
		{
			role: "user",
			content: `\`\`\`app:app-structure
${yaml.stringify({
	structure: uxdatamap.structure.routes,
})}
\`\`\``,
		},
		{
			role: `user`,
			content: `an example of the overall root App structure is meant to be is as follows ; use it as a reference :
\`\`\`tsx
${boilerplate}
\`\`\`

---

for additional reference if needed (ie. in case of auth conditionals)
the code for the global state store component that wraps the app (including this view you're working on) is defined in the following ;
you can import the store exports if needed by using : \`import {...} from '@/store/main'\`

\`\`\`@/store/main.tsx
${webapp.react.store.redux.latest.tsx}
\`\`\`
`,
		},
		{
			role: "user",
			content: `make the analysis and implement the tsx component;

> implement the react+tailwind component, fully and working from the get go;
> you are implementing the tsx code for the root App component

---

your code should import the provided and described views, as follows :
\`\`\`
/_ ... _/
${viewsImportHead}
/_ ... _/
\`\`\`

---

> should be React.FC ! important !
> you should respect the way to build Routes in the provided code snippet ! do not innovate in this regard !
> for reminder, this is the way :

\`\`\`
import {
Route,
Routes,
} from "react-router-dom";
[...]
<Routes>
<Route path="/" element={<UV_ExampleLanding />} />
<Route path="/find/:slugexample" element={<UV_OtherViewExample/>} />
</Routes>
[...]
\`\`\`

---

> do not hallucinate methods or component imports that do not exist !

    all that exists has been provided to you
    any required additional actions should be implemented by you ; you are provided with all needed details to implement anything !
    > the global store and its methods is defined in @/store/main.tsx
    > the views are defined in @/components/views/[sectionId].tsx
    > that's all !!
    DO NOT ASSUME OTHER STUFF IS IMPLEMENTED !
    IF YOU NEED TO CALL THE API OR SOMETHING SIMILAR, WRITE YOUR OWN FUNCTIONS INSIDE THIS VIEW !!
    IMPLEMENT, DO NOT ASSUME ANYTHING ELSE IS IMPLEMENTED !

> conduct the analysis first, reply with the analysis inside of \`\`\`markdown\`\`\`
> it should emphasize the full functionalities required and specified in the provided details

> then, answer in a react tsx code for the App root component reply in \`\`\`tsx\`\`\` based on your analysis
> the code should be complete and fully functional !

you are a genius + you get $9999`
