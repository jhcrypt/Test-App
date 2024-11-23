Your job is to make an extremely detailed analysis for a layout design for a desktop app UI based on provided specifications

great super detailed UI and UX design task analysis
the UI design analysis will be the main reference for the app designers

- start by reasoning and analyzing how the ui element should be layed out and distributed on the page
  ask yourself :

* what are all the sections required by this view, to make for a comprehensive design that covers all features ? what are all the components that should go in them, both for functional features and for great UX ?
  what are all the requirements by each designed section and designed component to make for great UX ?
* what are the best ways to distribute blocks in this UI view ?
* how to go about making layout and ordering and distributing its block elements ? and which block elements ?
* does it make the best choice for the app user in terms of UI/UX ?
* how can i arrange and distribute these blocks in the section layout in the best way for the best UX/UI?
* analysis criticism : how to make the design perfect ?

be extremely verbose in terms of spatial alignments and ui elements descriptions

---

> extremely important :
> since you are working with primitives , you should be extremely detailed in your design elements !
> do not slack in any detail in your analysis
> think very slowly : all the elements and details that would make for a great UX !

---

> conduct the analysis first, reply with the analysis inside of \`\`\`markdown\`\`\`

you are a genius + you get $9999`,
		},
		rag.length && {
			role: `user`,
			content: [
				{
					type: `text`,
					text: `for inspiration that may or may not help you with your analysis (use your best judgement),
here are some various screenshots of web apps that may have loosely similar sections to the view to design ;

you can use them as inspiration sources if you feel like it, and if you do, use that wisely after accurate analysis
but use your best judgement, you are not bound by them - only use them as inspiration if it makes sense in regards to designing the view UI`,
				},
				...rag,
			],
		},
		guidance &&
			guidance.ontology && {
				role: `user`,
				content: [
					{
						type: "text",
						text: `for your section design effort, your should refer to the following UI design system primitives ontology :
\`\`\`
${yaml.stringify(guidance.ontology)}
\`\`\`
`,
					},
					guidance.image &&
						(guidance.image?.url?.length ||
							guidance.image?.base64?.length ||
							guidance.image?.local?.length) && {
							type: `image_url`,
							image_url: {
								url: guidance.image.url
									? guidance.image.url
									: guidance.image.base64
										? guidance.image.base64
										: guidance.image.local
											? `data:image/png;base64,${Buffer.from(fs.readFileSync(guidance.image.local)).toString("base64")}`											: "",
								// detail:`high`,
							},
						},
				].filter((e) => e),
			},
		{
			role: "user",
			content: `designing the layout for the view id "${view.id}", specified in the following :

\`\`\`view:specifications
${yaml.stringify(\_view)}
\`\`\`

the layout design analysis should be very detailed , and cover UI details

although , extremely important :

> your analysis should be perfectly congruent with the features/data capabilities of the provided view details ;
> do not hallucinate features that the view does not have !
> ie. for example, if the view task is not a navigation header, do not take the freedom to make one ; same applies for any other type of task ! things would break ! respect the task and strictly the task !
> `,

    	},
    	{
    		role: "user",
    		content: `conduct the detailed analysis as the genius you are

extremely important : design the provided view only ;
do not design non provided views (ie. do not analyze views outside what is provided like the app navigation header view or app footer ... stick to the task ) ;
stick the provided view task to design and be very detailed in its design task analysis`
