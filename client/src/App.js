// App root: định nghĩa routes chính, preload một số dữ liệu toàn cục và cấu hình toast notifications.
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Rental, Homepage, DetailPost, SearchDetail, Contact, ResetPass, RegisterResult, ChangePassword } from './containers/Public'
import { path } from './ultils/constant' // File chứa các đường dẫn URL constants
import { System, CreatePost, ManagePost, EditAccount, Wishlist } from './containers/System'
import { Admin, ManageExpired, ManageReport, ManageUser, Dashboard } from './containers/Admin'
import { ChatBoxAI } from './components'
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  // dispatch: dùng để gọi các action creators của redux
  // isLoggedIn: trạng thái đăng nhập, lấy từ slice 'auth' trong redux store
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 1000)
  }, [isLoggedIn])

  // Preload một số dữ liệu tĩnh/thiết yếu khi app mount để tránh fetch lặp ở nhiều nơi
  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())
  }, [])

  return (
    <div className="bg-primary overflow-hidden">
      {/* Các route chính của app: Home là layout chính chứa nhiều route con */}
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='*' element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAL_POST__TITLE__POSTID} element={<DetailPost />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
          <Route path={path.CONTACT} element={<Contact />} />
        </Route>
        <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={path.FINAL_REGISTER} element={<RegisterResult />} />
        <Route path={path.RESET_PASS} element={<ResetPass />} />
        <Route path={path.SYSTEM} element={<System />} >
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
        <Route path={path.ADMIN} element={<Admin />} >
          <Route path={path.MANAGE_EXPIRED} element={<ManageExpired />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
          <Route path={path.MANAGE_REPORT} element={<ManageReport />} />
          <Route path={path.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Routes>
      {/* ToastContainer: hiển thị thông báo (toast). Ứng dụng có 2 lần render ToastContainer trong file gốc; giữ nguyên hành vi hiện tại. */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="color"
      />
      <ToastContainer />
      {/* ChatBox AI Gemini - Trợ lý AI góc dưới phải */}
      <ChatBoxAI />
    </div>
  );
}

export default App;
