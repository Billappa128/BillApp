import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Menubar from '../../components/menubar/Menubar'
import Footer from '../../components/footer/Footer'
import styles from "./Home.module.css"
import Service from '../service/Service'
import Dashboard from '../dashboard/Dashboard'
import Deposit from '../deposit/Deposit'
import Bankingbill from '../bill/Bankingbill'
import Vtbbanking from '../bill/inbill/vtbbanking/Vtbbanking'
import Vcbbanking from '../bill/inbill/vcbbanking/Vcbbanking'
import Mbbanking from '../bill/inbill/mbbanking/Mbbanking'
import Techbanking from '../bill/inbill/techbanking/Techbanking'
import Msbbanking from '../bill/inbill/msbbanking/Msbbanking'
import Bidvbanking from '../bill/inbill/bidvbanking/Bidvbanking'
import Momobanking from '../bill/inbill/momobanking/Momobanking'
import Tpbanking from '../bill/inbill/tpbanking/Tpbanking'
import Vpbanking from '../bill/inbill/vpbanking/Vpbanking'
import AgrBanking from '../bill/inbill/agrbanking/AgrBanking'
import Acbbanking from '../bill/inbill/acbbanking/Acbbanking'
import Lpbbanking from '../bill/inbill/lpbbanking/Lpbbanking'
import Bidvchecking from '../billchecking/bidvchecking/Bidvchecking'
import Vcbchecking from '../billchecking/vcbchecking/Vcbchecking'
import Tcbchecking from '../billchecking/tcbchecking/Tcbchecking'
import Tpbchecking from '../billchecking/tpbchecking/Tpbchecking'
import Tcbbalance from '../billbalance/tcbbalance/Tcbbalance'
import Vcbbalance from '../billbalance/vcbbalance/Vcbbalance'
import Tpbbalance from '../billbalance/tpbbalance/Tpbbalance'
import Vcbbankingvip from '../bill/inbill/vcbbankingVIP/Vcbbankingvip'
import Profile from '../../components/profile/Profile'
import Bidvbankingvip from '../bill/inbill/bidvbankingVIP/Bidvbankingvip'
import Mbbchecking from '../billchecking/mbbchecking/Mbbchecking'

export default function Home({filter}) {
  return (
    <div className={styles.home}>
      <div className={`${styles.left}`}>
          <Menubar />
      </div>
      <div className={`${styles.right} rightPage`}>
        <div className={styles.wrapper}>
          <Topbar />
          {filter === 'dashboard' && <Dashboard />}
          {filter === 'deposit' && <Deposit />}
          {filter === 'service' && <Service />}
          {filter === 'bill' && <Bankingbill />}
          {filter === 'profile' && <Profile />}

          {/* Bill Banking */}
          {filter === 'billbanking-vtb' && <Vtbbanking />}
          {filter === 'billbanking-vcb' && <Vcbbanking />}
          {filter === 'billbanking-vcbv' && <Vcbbankingvip />}
          {filter === 'billbanking-mb' && <Mbbanking />}
          {filter === 'billbanking-tcb' && <Techbanking />}
          {filter === 'billbanking-msb' && <Msbbanking />}
          {filter === 'billbanking-bidv' && <Bidvbanking />}
          {filter === 'billbanking-bidvv' && <Bidvbankingvip />}
          {filter === 'billbanking-momo' && <Momobanking />}
          {filter === 'billbanking-tpb' && <Tpbanking />}
          {filter === 'billbanking-vpb' && <Vpbanking />}
          {filter === 'billbanking-agr' && <AgrBanking />}
          {filter === 'billbanking-acb' && <Acbbanking />}
          {filter === 'billbanking-lpb' && <Lpbbanking />}

          {/* Bill Checking */}
          {filter === 'billchecking-tcb' && <Tcbchecking/>}
          {filter === 'billchecking-vcb' && <Vcbchecking/>}
          {filter === 'billchecking-mbb' && <Mbbchecking/>}
          {filter === 'billchecking-tpb' && <Tpbchecking/>}
          {filter === 'billchecking-bidv' && <Bidvchecking/>}

          {/* Bill Balance */}
          {filter === 'billbalance-tcb' && <Tcbbalance/>}
          {filter === 'billbalance-vcb' && <Vcbbalance/>}
          {filter === 'billbalance-tpb' && <Tpbbalance/>}

        </div>
        <Footer />
      </div>
    </div>
  )
}
