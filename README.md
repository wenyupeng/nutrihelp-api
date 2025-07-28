# nutrihelp-api
Optimized Nutrihelp backend service based on the previous project [Nutrihelp-api](https://github.com/Gopher-Industries/Nutrihelp-api)

# Project Structure
```
/nutrihelp-api
  ├── /.github             # Workflows for vulnerability test
  ├── /doc                 # Documentationm (table specification, project development guidelines, swagger specification) 
  │     ├── /spec          # Specification
  │     ├── index.yaml     # Swagger yaml
  ├── /log                 # Application logs
  ├── /script              # Deployment/maintenance scripts includes Image classification py and model
  ├── /src
  │     ├── /conf          # App configuration external configuration
  │     ├── /controllers   # API controllers
  │     ├── /middleware    # API middleware internal configuration and other filter
  │     ├── /models        # Database models (ORM or schema definitions)
  │     ├── /routes        # API routes definitions
  │     ├── /utils         # Utility functions
  ├── /tools               # Tools for security check, image classification
  ├── /tests               # Unit and integration tests
  ├── /uploads             # Temporary file uploads
  ├── .env                 # Environment variables
  ├── README.md
  └── package.json
```

# Build Project Environment 
## Clone Project
```bash
git clone https://github.com/wenyupeng/nutrihelp-api.git
```

## Install the required dependencies
```bash
npm install
```

```bash
pip install -r requirement.txt
```
> hits: recommand to install miniconda to build your own env, some dependencies rely on lower version python

## Start Server
```bash
npm start
```
You can now access the API at `http://localhost:80`