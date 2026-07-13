import mongoose from 'mongoose';

// Check if mongoose is connected (readyState === 1)
export const isDbConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Seed 10 cloud-based mock projects
export const mockProjects = [
  {
    _id: 'proj_mock_1',
    title: 'AWS Serverless Image Processor',
    description: 'A serverless pipeline to upload, crop, resize, and optimize images automatically in the cloud. Features AWS Lambda triggers, API Gateway, and secure S3 bucket events.',
    price: 299,
    category: 'source-code',
    techStack: ['AWS Lambda', 'Amazon S3', 'API Gateway', 'Node.js', 'Sharp'],
    previewUrls: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'aws-image-processor.zip',
    fileName: 'aws-image-processor-v1.zip',
    fileSize: '1.8 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 4.8, count: 2 },
    downloadCount: 45,
    versions: [
      { version: 'v1.0.0', fileKey: 'aws-image-processor.zip', fileName: 'aws-image-processor-v1.zip', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_2',
    title: 'GCP Kubernetes Dev Pipeline (IaC)',
    description: 'A complete Terraform setup to provision a secured Google Kubernetes Engine (GKE) cluster, configured with automated GCP Cloud Build CI/CD triggers.',
    price: 299,
    category: 'source-code',
    techStack: ['Terraform', 'GCP GKE', 'Cloud Build', 'Docker', 'Kubernetes'],
    previewUrls: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'gcp-gke-pipeline.zip',
    fileName: 'gcp-gke-pipeline-v1.zip',
    fileSize: '2.5 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 5.0, count: 1 },
    downloadCount: 22,
    versions: [
      { version: 'v1.0.0', fileKey: 'gcp-gke-pipeline.zip', fileName: 'gcp-gke-pipeline-v1.zip', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_3',
    title: 'Azure Cognitive AI Chat Assistant',
    description: 'Integrate custom Azure OpenAI models into your MERN stack. Includes real-time streaming replies, chat logs preservation in Cosmos DB, and audio transcriptions.',
    price: 299,
    category: 'source-code',
    techStack: ['Azure OpenAI', 'Cosmos DB', 'Node.js', 'React', 'WebSockets'],
    previewUrls: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'azure-ai-assistant.zip',
    fileName: 'azure-ai-assistant-v1.zip',
    fileSize: '3.1 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 4.6, count: 3 },
    downloadCount: 30,
    versions: [
      { version: 'v1.0.0', fileKey: 'azure-ai-assistant.zip', fileName: 'azure-ai-assistant-v1.zip', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_4',
    title: 'Firebase Real-Time Collaboration Canvas',
    description: 'A multi-user shared whiteboarding canvas where updates synchronize instantly via Firestore. Perfect for virtual brainstorming workshops.',
    price: 299,
    category: 'templates',
    techStack: ['React', 'Firebase', 'Cloud Firestore', 'HTML5 Canvas'],
    previewUrls: ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'firebase-canvas.zip',
    fileName: 'firebase-canvas-v1.zip',
    fileSize: '1.4 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 0.0, count: 0 },
    downloadCount: 5,
    versions: [
      { version: 'v1.0.0', fileKey: 'firebase-canvas.zip', fileName: 'firebase-canvas-v1.zip', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_5',
    title: 'AWS CloudFormation VPC & ECS Infrastructure',
    description: 'Production-ready CloudFormation scripts. Provision a highly-available VPC, Public/Private subnets, Application Load Balancers, and an ECS Fargate cluster.',
    price: 299,
    category: 'source-code',
    techStack: ['AWS CloudFormation', 'Amazon VPC', 'ECS Fargate', 'Load Balancer'],
    previewUrls: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'aws-ecs-infra.zip',
    fileName: 'aws-ecs-infra-v1.zip',
    fileSize: '1.1 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 4.9, count: 12 },
    downloadCount: 88,
    versions: [
      { version: 'v1.0.0', fileKey: 'aws-ecs-infra.zip', fileName: 'aws-ecs-infra-v1.zip', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_6',
    title: 'GCP Cloud Run Microservices Boilerplate',
    description: 'Containerized Express starter kit configured for Google Cloud Run serverless hosting. Integrates pub/sub messaging patterns and Cloud SQL connections.',
    price: 299,
    category: 'source-code',
    techStack: ['Google Cloud Run', 'Cloud SQL', 'Node.js', 'Pub/Sub', 'Docker'],
    previewUrls: ['https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'gcp-cloud-run-starter.zip',
    fileName: 'gcp-cloud-run-starter-v1.zip',
    fileSize: '2.0 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 4.7, count: 4 },
    downloadCount: 16,
    versions: [
      { version: 'v1.0.0', fileKey: 'gcp-cloud-run-starter.zip', fileName: 'gcp-cloud-run-starter-v1.zip', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_7',
    title: 'Azure Synapse Serverless ETL Data Pipeline',
    description: 'A step-by-step PDF handbook and pipeline scripts mapping large dataset transfers from Azure Blob Storage into Azure Synapse Analytics pools.',
    price: 299,
    category: 'pdfs',
    techStack: ['Azure Synapse', 'Azure Data Factory', 'Blob Storage', 'SQL Pool'],
    previewUrls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'azure-synapse-guide.pdf',
    fileName: 'Azure-Synapse-ETL-Pipeline.pdf',
    fileSize: '3.4 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 0.0, count: 0 },
    downloadCount: 12,
    versions: [
      { version: 'v1.0.0', fileKey: 'azure-synapse-guide.pdf', fileName: 'Azure-Synapse-ETL-Pipeline.pdf', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_8',
    title: 'Cloudflare Workers Edge API Gateway Router',
    description: 'Deploy API routers on Cloudflare Workers edge nodes. Minimizes latency using Workers KV caching, JWT checks, and custom subdomain bindings.',
    price: 299,
    category: 'source-code',
    techStack: ['Cloudflare Workers', 'Wrangler CLI', 'Key-Value Caching', 'ES Modules'],
    previewUrls: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'cf-edge-router.zip',
    fileName: 'cf-edge-router-v1.zip',
    fileSize: '0.8 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 4.8, count: 9 },
    downloadCount: 54,
    versions: [
      { version: 'v1.0.0', fileKey: 'cf-edge-router.zip', fileName: 'cf-edge-router-v1.zip', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_9',
    title: 'Dockerized Microservices SaaS Boilerplate',
    description: 'A cloud-native starter kit linking Express gateway routing, Redis state synchronization, MongoDB database, and Nginx proxy in Docker containers.',
    price: 299,
    category: 'templates',
    techStack: ['Docker Compose', 'Nginx Proxy', 'Redis Cache', 'Express', 'MongoDB'],
    previewUrls: ['https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'docker-microservices.zip',
    fileName: 'docker-microservices-v1.zip',
    fileSize: '2.8 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 5.0, count: 18 },
    downloadCount: 120,
    versions: [
      { version: 'v1.0.0', fileKey: 'docker-microservices.zip', fileName: 'docker-microservices-v1.zip', releaseNotes: 'Initial release' }
    ]
  },
  {
    _id: 'proj_mock_10',
    title: 'AWS Lambda Secure Custom Authorizer',
    description: 'Implement a token-based JWT custom authorizer for AWS API Gateway. Secures endpoints and routes requests based on user token roles.',
    price: 299,
    category: 'source-code',
    techStack: ['AWS Lambda', 'API Gateway', 'JSON Web Tokens', 'Node.js', 'IAM Policy'],
    previewUrls: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'],
    fileKey: 'aws-lambda-authorizer.zip',
    fileName: 'aws-lambda-authorizer-v1.zip',
    fileSize: '1.2 MB',
    createdBy: 'mock_admin_id',
    ratings: { average: 4.5, count: 2 },
    downloadCount: 15,
    versions: [
      { version: 'v1.0.0', fileKey: 'aws-lambda-authorizer.zip', fileName: 'aws-lambda-authorizer-v1.zip', releaseNotes: 'Initial release' }
    ]
  }
];

// In-Memory state for mock operations
export const mockDb = {
  users: [
    { _id: 'mock_admin_id', name: 'Marketplace Admin', email: 'admin@marketplace.com', role: 'admin', referralCode: 'ADMIN7', referralEarnings: 0, wishlist: [] },
    { _id: 'mock_user_id', name: 'John Doe', email: 'user@marketplace.com', role: 'user', referralCode: 'JOHN9', referralEarnings: 100, wishlist: [] }
  ],
  projects: [...mockProjects],
  orders: [],
  coupons: [
    { _id: 'coupon_1', code: 'WELCOME30', discountType: 'percentage', discountValue: 30, minOrderAmount: 200, expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), usedCount: 0, usageLimit: 100, isActive: true }
  ],
  reviews: [
    { _id: 'rev_1', user: { _id: 'mock_user_id', name: 'John Doe' }, project: 'proj_mock_1', rating: 5, comment: 'Outstanding template! Easy to configure Lambda actions.', createdAt: new Date() }
  ],
  support: [],
  downloads: [],
  featureRequests: []
};
