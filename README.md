# Serverless Orchestration with Workflows
A simple example from one of Google Cloud Self-Paced Labs, [Serverless Orchestration with Workflows](https://www.cloudskillsboost.google/catalog_lab/3528), but instead of Python, this example is using NodeJS and is even more simplified than the original example. Two Cloud Functions are connected with Workflows. [Guide](https://cloud.google.com/workflows/docs/run/tutorial-cloud-run)

## When to use Cloud Workflows
Used to orchestrate and coordinate a sequence of for example Cloud Run services or Cloud Functions. Could simplify a complex workflow and make it easier to understand and maintain, with steps defined in configuration files. Suitable for certain cases, like when a flow is complex, when there is a need to wait for things to complete, when there is a sequential flow with sequential operations.

## Running the functions locally
The library [@google-cloud/functions-framework](https://www.npmjs.com/package/@google-cloud/functions-framework) provides a lightweight web server to run the Cloud Functions code locally, so we do not have to add a web server

Install the dependencies:
```sh
yarn install
```
Start the web server
```sh
yarn start
```
Invoke the function

In the randomgen directory, to invoke randomgen function make a GET request to http://localhost:8080

In the multiply directory, to invoke multiply function make a POST request to http://localhost:8080 and provide an input attribute with a number value in the request body {"input": 30}

## Deploying the functions
Set the default project
```sh
gcloud config set project <project-id>
```
Replace `<project-id>` with the ID of your GCP project

Make sure following services are enabled
```sh
gcloud services enable \
   cloudfunctions.googleapis.com \
   workflows.googleapis.com \
   cloudbuild.googleapis.com \
   storage.googleapis.com
```

Deploy randomgen function
From inside randomgen directory run command
```sh
gcloud functions deploy randomgen \
   --runtime nodejs18 \
   --trigger-http \
   --allow-unauthenticated
```

Deploy multiply function
From inside multiply directory run command
```sh
gcloud functions deploy multiply \
   --runtime nodejs18 \
   --trigger-http \
   --allow-unauthenticated
```

Get the URLs for the deployed functions
```sh
gcloud functions describe randomgen \
   --format='value(httpsTrigger.url)'
```

```sh
gcloud functions describe multiply \
   --format='value(httpsTrigger.url)'
```

Example of doing a POST request to the multiply function
```sh
curl $(gcloud functions describe multiply \
   --format='value(httpsTrigger.url)') \
   -X POST \
   -H "content-type: application/json" \
   -d '{"input": 5}'
```

## Connect the two functions using Cloud Workflows
As shown the workflow declarations in workflow.yaml the result of the first Cloud Function is passed to the second cloud function in the request body

Update workflow.yaml with the URLs of the deployed functions

Deploy the workflow
```sh
gcloud beta workflows deploy workflow --source=workflow.yaml
```

Execute the workflow
```sh
gcloud beta workflows execute workflow
```
Or execute the workflow in Cloud Console

Retrieve the details of the most recent execution of a Cloud Workflows workflow
```sh
gcloud beta workflows executions describe-last
```
