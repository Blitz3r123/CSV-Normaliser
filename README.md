# CSV Normaliser

## Contents:
- [1. Introduction](#1-introduction)
- [2. Installation](#2-installation)

## 1. Introduction

I created this to help me with my final year project. In my final year project I had data in the following format:

Latency     |Min    |Max    
---         |---    |---
123         |456    |789
...         |...    |...
Averages:   |       |
123         |       |
...         |       |

So I created this tool to get rid of the averages at the end of the file to make it easier to manipulate the raw numbers.

So the outcome of the tool would be of the following format:

Header One  |Header Two     |Header Three    
---         |---            |---
123         |456            |789
...         |...            |...
...         |...            |...
...         |...            |...

Also, sometimes my data would have annoying header names like:

Header One(us): |Header Two(s): |Header Three (mb/s):
---             |---            |---
...             |...            |...

So this tool would remove any special characters to produce the following:

HeaderOneus     |HeaderTwos     |HeaderThreembs
---             |---            |---
...             |...            |...

This would make it easier to use my other tool [CDF Grapher](https://github.com/Blitz3r123/CDFGrapher) to graph CDFs.

## 2. Installation
Since I haven't built this yet, to get it working follow these steps:

1. Clone this repo: `git clone https://github.com/Blitz3r123/CSV-Normaliser.git`
2. Install all packages `npm install` (*you need npm installed for this step*)
3. Run the tool: `npm start` (*you still need npm installed for this step too*)
4. Voila!
5. Enjoy!

***This tool is under development. Once it reaches a stage where it has entered production mode this message will disappear just like all the bugs....***