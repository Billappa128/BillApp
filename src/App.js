import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={user ? <Home filter={"dashboard"}/> : <Login/> } />

          <Route path='/register' element={user ? <Home filter={"dashboard"}/> : <Register/>} />
          
          <Route path='/login' element={user ? <Home filter={"dashboard"}/> :<Login />} />
          <Route path='/admin' element={user && user.isAdmin ? <Admin/> :<Login />} />
          <Route path='/profile/:id' element={user ? <Home filter={"profile"}/> : <Login />} />

          <Route path='/deposit' element={user ? <Home filter={"deposit"}/> : <Login />} />

          <Route path='/service' element={user ? <Home filter={"service"} /> : <Login />} />

          {/* Bill Banking */}
          <Route path='/bill/banking' element={user ? <Home filter={"bill"} />: <Login/>}  />
          <Route path='/bill/banking/vtb' element={user ? <Home filter={"billbanking-vtb"} /> : <Login/>} />
          <Route path='/bill/banking/vcb' element={user ? <Home filter={"billbanking-vcb"} /> : <Login/>} />
          <Route path='/bill/banking/vcbv' element={user ? <Home filter={"billbanking-vcbv"} /> : <Login/>} />
          <Route path='/bill/banking/bidv' element={user ? <Home filter={"billbanking-bidv"} /> : <Login/>} />
          <Route path='/bill/banking/bidvv' element={user ? <Home filter={"billbanking-bidvv"} /> : <Login/>} />
          <Route path='/bill/banking/mbb' element={user ? <Home filter={"billbanking-mb"} /> : <Login/>} />
          <Route path='/bill/banking/msb' element={user ? <Home filter={"billbanking-msb"} /> : <Login/>} />
          <Route path='/bill/banking/tcb' element={user ? <Home filter={"billbanking-tcb"} /> : <Login/>} />
          <Route path='/bill/banking/vpb' element={user ? <Home filter={"billbanking-vpb"} /> : <Login/>} />
          <Route path='/bill/banking/tpb' element={user ? <Home filter={"billbanking-tpb"} /> : <Login/>} />
          <Route path='/bill/banking/momo' element={user ? <Home filter={"billbanking-momo"} /> : <Login/>} />
          <Route path='/bill/banking/lpb' element={user ? <Home filter={"billbanking-lpb"} /> : <Login/>} />
          <Route path='/bill/banking/agr' element={user ? <Home filter={"billbanking-agr"} /> : <Login/>} />
          <Route path='/bill/banking/acb' element={user ? <Home filter={"billbanking-acb"} /> : <Login/>} />

          {/* Bill checking */}
          <Route path='/bill/checking' element={user ? <Home filter={"bill"} />: <Login/>}  />
          <Route path='/bill/checking/vcb' element={user ? <Home filter={"billchecking-vcb"} />: <Login/>} />
          <Route path='/bill/checking/mbb' element={user ? <Home filter={"billchecking-mbb"} />: <Login/>} />
          <Route path='/bill/checking/bidv' element={user ? <Home filter={"billchecking-bidv"} />: <Login/>} />
          <Route path='/bill/checking/tcb' element={user ? <Home filter={"billchecking-tcb"} />: <Login/>} />
          <Route path='/bill/checking/tpb' element={user ? <Home filter={"billchecking-tpb"} />: <Login/>} />


          {/* Bill balance */}
          <Route path='/bill/balance' element={user ? <Home filter={"bill"} />: <Login/>}  />
          <Route path='/bill/balance/tcb' element={user ? <Home filter={"billbalance-tcb"} />: <Login/>} />
          <Route path='/bill/balance/vcb' element={user ? <Home filter={"billbalance-vcb"} />: <Login/>} />
          <Route path='/bill/balance/tpb' element={user ? <Home filter={"billbalance-tpb"} />: <Login/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
