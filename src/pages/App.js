import Header from "../components/header";
import SectionTitle from "../components/sectionTitle";
import Input from "../components/input";
import Table from "../components/table";
import NumberController from "../components/numberController";
import { useEffect, useState } from "react";
import QuantityProductModal from "../components/modal/quantityProductModal";
import EditProductModal from "../components/modal/editProductModal";
import DeleteProductModal from "../components/modal/deleteProductModal";
import { useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [searchText, setSearchText] = useState("");

  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [titleQuantityModal, setTitleQuantityModal] = useState(0);
  const [operationQuantityModal, setOperationQuantityModal] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  function fetchProducts() {
    fetch(`http://localhost:3000/user/${loggedUser.id}/produtos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }

  const rows = products.map((item) => {
    return {
      content: [
        item.name,
        <NumberController
          value={item.quantity}
          onPlusClick={() => {
            setShowQuantityModal(true);
            setSelectedProduct(item);
            setTitleQuantityModal("Incrementar estoque");
            setOperationQuantityModal("addition");
          }}
          onSubtractClick={() => {
            setShowQuantityModal(true);
            setSelectedProduct(item);
            setTitleQuantityModal("Informe a quantidade a ser removida");
            setOperationQuantityModal("subtraction");
            fetchProducts();
          }}
        />,
      ],
      options: [
        {
          text: "Editar",
          onClick: () => {
            setShowEditModal(true);
            setSelectedProduct(item);
          },
        },
        {
          text: "Excluir",
          onClick: () => {
            setShowDeleteModal(true);
            setSelectedProduct(item);
          },
        },
      ],
    };
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Header />
      <QuantityProductModal
        product={selectedProduct}
        handleActiveModal={setShowQuantityModal}
        isActive={showQuantityModal}
        title={titleQuantityModal}
        operation={operationQuantityModal}
        handleConfirm={fetchProducts}
      />
      <EditProductModal
        product={selectedProduct}
        handleActiveModal={setShowEditModal}
        isActive={showEditModal}
        handleConfirm={fetchProducts}
      />
      <DeleteProductModal
        product={selectedProduct}
        handleActiveModal={setShowDeleteModal}
        isActive={showDeleteModal}
        handleConfirm={fetchProducts}
      />
      <SectionTitle
        className="inventory-title"
        text="Meu estoque"
        buttons={[
          {
            text: "Novo produto",
            style: {
              type: "primary",
              size: "md",
            },
            onClick: () => {
              navigate("/novo-produto");
            },
          },
        ]}
      />
      <div className="inventory">
        <Input
          className="inventory__search-input"
          label="Pesquisar produto"
          value={searchText}
          placeholder="Digite o nome do produto aqui"
          onChange={setSearchText}
        />
        <Table header={["Nome", "Unidades", ""]} row={rows} />
      </div>
    </div>
  );
}

export default App;
