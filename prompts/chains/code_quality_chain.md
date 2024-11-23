# Code Quality Chain

This chain manages the code quality improvement process through a series of specialized agents that work together to evaluate, improve, and validate code quality.

## Chain Components

### 1. Code Evaluation Agent

${fs.readFileSync('prompts/code_evaluation_agent.md', 'utf8')}

### 2. Code Improver Agent

${fs.readFileSync('prompts/code_improver_agent.md', 'utf8')}

### 3. Code Rating Agent

${fs.readFileSync('prompts/code_rater_agent.md', 'utf8')}

### 4. Code Generator Agent

${fs.readFileSync('prompts/code_generator_agent.md', 'utf8')}

## Chain Workflow

1. Code Evaluation Agent analyzes code and produces evaluation report
2. Code Improver Agent uses report to improve code
3. Code Rating Agent rates improvements
4. Code Generator Agent determines if further improvement is needed
5. Process repeats until quality threshold is met or max iterations reached

## Usage

Use the following commands to interact with the chain:

- #evaluate-code - Start code evaluation
- #improve-code - Improve code based on evaluation
- #rate-code - Rate code improvements
- #generate-code - Generate final improved code
- #code-quality-status - Check chain status
