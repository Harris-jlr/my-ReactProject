import Navbar from './components/Navbar';
import Footer from './components/Footer';
import userQuestions from './components/UserQuestions';


export default function Example() {
    return (
    
      <div className="Design">
      <Navbar />
        <div className="Content ">
              <userQuestions />
        </div>
      <Footer />
      </div>
 

  );
}