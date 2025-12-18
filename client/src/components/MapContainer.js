import { MapContainer as MapWrapper, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { memo } from "react";

// Fix the default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapContainer = ({ locations = [], zoom = 13 }) => {
    // Kiểm tra dữ liệu locations
    const isValidLocation =
        Array.isArray(locations) &&
        locations.length > 0 &&
        locations.every(
            (loc) =>
            typeof loc.latitude === "number" &&
            typeof loc.longitude === "number" &&
            !isNaN(loc.latitude) &&
            !isNaN(loc.longitude)
        );

    // Debug dữ liệu locations
    console.log("MapContainer locations:", locations);
    console.log("isValidLocation:", isValidLocation);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            {isValidLocation ? (
                <MapWrapper
                    center={[locations[0].latitude, locations[0].longitude]}
                    zoom={zoom}
                    style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations.map((location, index) => (
                        <Marker
                            key={index}
                            position={[location.latitude, location.longitude]}
                        >
                            <Popup>
                                {location.displayName || "Không có tên"}
                            </Popup>
                        </Marker>
                    ))}
                </MapWrapper>
            ) : (
                <div className="text-center text-gray-500 h-full flex items-center justify-center">
                    Không thể hiển thị bản đồ: {locations.length === 0 ? "Dữ liệu tọa độ rỗng" : "Dữ liệu tọa độ không hợp lệ"}
                </div>
            )}
        </div>
    );
};

export default memo(MapContainer);