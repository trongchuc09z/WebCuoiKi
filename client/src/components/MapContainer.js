import { useState, useMemo } from "react";
import GoogleMapReact from "google-map-react";

// Marker component
const Marker = ({ text, lat, lng }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -100%)",
      cursor: "pointer",
    }}
  >
    <div
      style={{
        backgroundColor: "#FF0000",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "3px solid white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    />
    {text && (
      <div
        style={{
          position: "absolute",
          top: "25px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        {text}
      </div>
    )}
  </div>
);

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

  // Tính toán center và default zoom
  const defaultProps = useMemo(() => {
    if (!isValidLocation) {
      return {
        center: {
          lat: 10.8231, // Default: Ho Chi Minh City
          lng: 106.6297,
        },
        zoom: 10,
      };
    }

    // Tính center từ locations
    const avgLat =
      locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
    const avgLng =
      locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;

    return {
      center: {
        lat: avgLat,
        lng: avgLng,
      },
      zoom: zoom,
    };
  }, [locations, zoom, isValidLocation]);

  if (!isValidLocation) {
    return (
      <div
        className="text-center text-gray-500 h-full flex items-center justify-center"
        style={{ height: "100%", width: "100%" }}
      >
        Không thể hiển thị bản đồ:{" "}
        {locations.length === 0
          ? "Dữ liệu tọa độ rỗng"
          : "Dữ liệu tọa độ không hợp lệ"}
      </div>
    );
  }

  // Google Maps API key (optional - map vẫn hoạt động không có key nhưng có watermark)
  const apiKey = process.env.REACT_APP_MAP_API || "";

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={apiKey ? { key: apiKey } : undefined}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            lat={location.latitude}
            lng={location.longitude}
            text={location.displayName || "Vị trí"}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;

