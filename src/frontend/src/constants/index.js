export const collatedTasks = [
  {key : 'INBOX', name: 'Inbox'},
  {key : 'TODAY', name: 'Today'},
  {key : 'NEXT_7', name: 'Next 7 Days'},
]
if (!process.env.BACKEND_SERVICE_URL) {
  console.warn("BACKEND_SERVICE_URL is not defined. Using default URL.");
}
export const API_BASE_URL = process.env.BACKEND_SERVICE_URL || "http://todo-cicd-backend.todo-webapp.svc.cluster.local:8000";