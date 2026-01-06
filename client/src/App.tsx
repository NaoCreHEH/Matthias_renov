import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminServices from "./pages/admin/AdminServices";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminContact from "./pages/admin/AdminContact";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import Testimonials from "./pages/Testimonials";
import Login from "./pages/Login";
import GyprocMons from "./pages/GyprocMons";
import PlafonnageMons from "./pages/plafonnageMons";
import EnduitsFinitionsMons from "./pages/EnduitsFinitionsMons";


function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/gyproc-mons"} component={GyprocMons} />
      <Route path={"/plafonnage-mons"} component={PlafonnageMons} />
      <Route path={"/enduits-finitions-mons"} component={EnduitsFinitionsMons} />
      <Route path={"/about"} component={About} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/users"} component={AdminUsers} />
      <Route path={"/admin/services"} component={AdminServices} />
      <Route path={"/admin/projects"} component={AdminProjects} />
      <Route path={"/admin/contact"} component={AdminContact} />
      <Route path={"/admin/testimonials"} component={AdminTestimonials} />
      <Route path={"/testimonials"} component={Testimonials} />
      <Route path={"/login"} component={Login} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
