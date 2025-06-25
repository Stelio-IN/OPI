import React, { useState, useEffect} from "react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

interface Route {
  id_rota: number;
  origen: string;
  destino: string;
  distancia: number;
  status: boolean;
}

const MapComponent: React.FC<{
  setNewRoute: React.Dispatch<React.SetStateAction<any>>;
}> = ({ setNewRoute }) => {
  const map = useMap();

  useEffect(() => {
    // Restrict map to Mozambique bounds
    const mozambiqueBounds = L.latLngBounds(
      [-26.8514, 30.2176], // Southwest corner
      [-10.4712, 40.8373]  // Northeast corner
    );
    map.setMaxBounds(mozambiqueBounds);
    map.setMinZoom(6);
    map.setMaxZoom(15);

    // Initialize drawn items layer
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialize draw control
    const drawControl = new L.Control.Draw({
      draw: {
        polyline: {
          shapeOptions: {
            color: '#0078A8',
            weight: 4,
          },
        },
        polygon: false,
        circle: false,
        marker: false,
        rectangle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);

    // Handle route drawing
    map.on('draw:created', (e: any) => {
      const layer = e.layer as L.Polyline;
      drawnItems.clearLayers(); // Clear previous drawings
      drawnItems.addLayer(layer);

      const latLngs = layer.getLatLngs() as L.LatLng[];
      let totalDistance = 0;

      // Calculate distance between consecutive points
      for (let i = 0; i < latLngs.length - 1; i++) {
        totalDistance += latLngs[i].distanceTo(latLngs[i + 1]) / 1000; // Convert to km
      }

      setNewRoute((prev: any) => ({
        ...prev,
        distancia: totalDistance.toFixed(2),
      }));
    });

    return () => {
      map.removeControl(drawControl);
      map.off('draw:created');
    };
  }, [map, setNewRoute]);

  return null;
};

const Routes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [newRoute, setNewRoute] = useState({
    origen: '',
    destino: '',
    distancia: '',
    status: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3005/api/rota/all');
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      setError('Erro ao buscar rotas');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (route: Route | null = null) => {
    if (route) {
      setCurrentRoute(route);
      setNewRoute({
        origen: route.origen,
        destino: route.destino,
        distancia: route.distancia.toString(),
        status: route.status,
      });
      setIsEditing(true);
    } else {
      setNewRoute({ origen: '', destino: '', distancia: '', status: true });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleSubmitRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3005/api/rota?id_rota=${currentRoute?.id_rota}`
      : 'http://localhost:3005/api/rota';
    const method = isEditing ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origen: newRoute.origen,
          destino: newRoute.destino,
          distancia: parseFloat(newRoute.distancia),
          status: newRoute.status,
        }),
      });
      if (response.ok) {
        setShowModal(false);
        fetchRoutes();
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteRoute = async (id_rota: number) => {
    if (confirm('Deseja excluir esta rota?')) {
      try {
        await fetch(`http://localhost:3005/api/rota?id_rota=${id_rota}`, {
          method: 'DELETE',
        });
        setRoutes(routes.filter((r) => r.id_rota !== id_rota));
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRoute((prev) => ({
      ...prev,
      [name]: name === 'status' ? value === 'true' : value,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rotas</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => openModal()}>
          + Nova Rota
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Rota' : 'Nova Rota'}</h2>
            <div className="mb-4">
              <MapContainer center={[-18.6657, 35.5296]} zoom={7} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapComponent setNewRoute={setNewRoute} />
              </MapContainer>
            </div>
            <form onSubmit={handleSubmitRoute} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Origem</label>
                <input
                  type="text"
                  name="origen"
                  value={newRoute.origen}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Ex: Maputo"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Destino</label>
                <input
                  type="text"
                  name="destino"
                  value={newRoute.destino}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Ex: Beira"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Distância (km)</label>
                <input
                  type="number"
                  name="distancia"
                  value={newRoute.distancia}
                  onChange={handleInputChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={newRoute.status.toString()}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="true">Ativa</option>
                  <option value="false">Inativa</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isEditing ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Origem</th>
                <th className="px-4 py-2">Destino</th>
                <th className="px-4 py-2">Distância</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id_rota} className="border-t">
                  <td className="px-4 py-2">{route.id_rota}</td>
                  <td className="px-4 py-2">{route.origen}</td>
                  <td className="px-4 py-2">{route.destino}</td>
                  <td className="px-4 py-2">{route.distancia} km</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${route.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {route.status ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => openModal(route)} className="text-blue-600 hover:underline">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteRoute(route.id_rota)} className="text-red-600 hover:underline">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {routes.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-gray-500 italic">
                    Nenhuma rota cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Routes;