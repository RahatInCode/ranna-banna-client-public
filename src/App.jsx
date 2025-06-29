
import './App.css'
import { ChefHat } from "lucide-react";

function MyComponent() {
  return (
    <div className="text-center p-4">
      <ChefHat className="w-10 h-10 text-gray-700" />
      <p className="mt-2 text-sm">Chef Mode On</p>
    </div>
  );
}

function App() {
  return (
    <>
      <MyComponent />
    </>
  )
}

export default App
