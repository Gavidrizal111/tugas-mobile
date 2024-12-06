import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0);

  const handleAddProduct = () => {
    setIsAdding(true);
  };

  const handleSaveProduct = () => {
    if (name.trim() && price.trim()) {
      const newProduct = {
        id: Date.now().toString(),
        name,
        price: parseInt(price, 10),
      };
      setProducts([...products, newProduct]);
      setTotal(total + parseInt(price, 10));
      setName("");
      setPrice("");
      setIsAdding(false);
    } else {
      alert("Harap isi nama produk dan harga");
    }
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    const removedProduct = products.find((product) => product.id === productId);
    if (removedProduct) {
      setTotal(total - removedProduct.price);
    }
    setProducts(updatedProducts);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Produk</Text>
        <Button title="Tambah" onPress={handleAddProduct} color="#007BFF" />
        <Text style={styles.header}>{total}</Text>
      </View>

      {/* Input untuk Nama Produk dan Harga */}
      {isAdding && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nama Produk"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Harga"
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
          <Button title="Oke" onPress={handleSaveProduct} color="#007BFF" />
        </View>
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
            <View style={styles.productRow}>
              <Text style={styles.product}>{item.name}</Text>
              <Text style={styles.product}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  product: {
    fontSize: 16,
  },
});
