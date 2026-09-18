import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Dashboard } from "./pages/Dashboard"
import { NewInterview } from "./pages/NewInterview"
import { InterviewDetail } from "./pages/InterviewDetail"
import { Settings } from "./pages/Settings"

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<NewInterview />} />
        <Route path="/interviews/:id" element={<InterviewDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}
