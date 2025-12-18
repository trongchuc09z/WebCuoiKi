import rootReducer from "./store/reducers/rootReducer"; // root reducer (kết hợp các reducer của app)
import { persistStore } from "redux-persist"; // để persist state giữa các phiên
import { createStore, applyMiddleware } from "redux"; // tạo store và áp dụng middleware
import thunk from 'redux-thunk' // middleware để hỗ trợ async action

// Tạo và cấu hình Redux store.
// Trả về đối tượng { store, persistor } để dùng trong Provider và PersistGate.
const reduxStore = () => {
    // tạo store với middleware thunk; có thể thêm middleware khác ở chỗ TODO bên dưới
    const store = createStore(rootReducer, applyMiddleware(thunk)) // TODO: thêm middleware khác (logger, saga, v.v.) nếu cần
    const persistor = persistStore(store) // khởi tạo persistor để đồng bộ với redux-persist

    return { store, persistor }
}

export default reduxStore // xuất factory tạo store