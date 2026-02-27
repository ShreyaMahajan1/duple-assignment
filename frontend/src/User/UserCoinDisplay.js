import React, { useEffect, useState } from 'react';
import ApiServices from '../Admin/ApiServices';
import { ClipLoader } from 'react-spinners';

const UserCoinDisplay = ({ rewards, warnings }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [coins, setCoins] = useState('');
  const [allCoins, setAllCoins] = useState([]);
  const [load,setLoad]=useState(true)
  
  useEffect(() => {
    let emptoken = sessionStorage.getItem('Emptoken');
    let id = sessionStorage.getItem('employeeId');
    let data = {
      _id: id,
    };

    ApiServices.getSingleEmp(data, { headers: { authorization: emptoken } })
      .then((res) => {
        console.log(res.data.data);
        setCoins(res.data.data.coins);
        setLoad(false)

      })
      .catch((error) => {
        console.error('Error fetching single employee data:', error);
      });

    ApiServices.AllCoins({employeeId:sessionStorage.getItem("employeeId")}, { headers: { authorization: emptoken } })
      .then((res) => {
        console.log("all coins", res.data.data);
        setAllCoins(res.data.data);
       
      })
      .catch((error) => {
        console.error('Error fetching all coins data:', error);
      });
    
  }, []);

  return (
    <>
     {load && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <ClipLoader loading={load} size={100} color="#0891b2" />
        </div>
      )}
    <main id="main" className="main">
      <div className="row">
        <div className="col">
          <div className="pagetitle">
            <h1>Daily progress</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Progress</a></li>
                <li className="breadcrumb-item active" aria-current="page">Daily Progress</li>
              </ol>
            </nav>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <p className="total-coins-earned me-2 fs-3 text-center">Total Coins Earned: </p>
            <img
              src="\assets\img\coin.png"
              alt="Coin"
              className="coin-image me-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: '30px',
                height: 'auto',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            />
            <div className="total-coins-box border border-dark rounded d-flex align-items-center justify-content-center" style={{ width: '100px', height: '50px' }}>
              <p className="card-text fs-3 mb-0">{coins}</p>
            </div>
          </div>
          {Array.isArray(allCoins) && allCoins.length > 0 && (
            allCoins.map((el) => (
              <div key={el._id} className="card mb-3 shadow-sm">
                <div className="card-body ">
                  <h6 className="card-title mb-1 display-4">{el.type === "add" ? "Reward" : "Warning"}</h6>
                  <h6 className=" mb-0 fs-4">Task : {el.taskId?.title}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    
                    <p className=" mb-0 fs-4">Message : {el.message}</p>
                    <div className={`circle bg-${el.type === "add" ? "success" : "danger"} text-white d-flex align-items-cewwnter justify-content-center mx-auto my-3`} style={{ width: '30px', height: '30px', borderRadius: '50%' }}>{el.coinCount}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
    </>
  );
};

export default UserCoinDisplay;
