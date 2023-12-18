const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Produk = Sequelize.define(
        "Produk",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
              },
              nama: {
                type: DataTypes.STRING,
              },
              deskripsi: {
                type: DataTypes.STRING
              },
              createdAt: {
                type: DataTypes.DATE,
                allowNull: false
              },
              updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
              }
        },{
            tableName: "produk"
        }
    );
    return Produk;
};