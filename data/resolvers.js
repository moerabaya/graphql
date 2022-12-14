import { reject } from "lodash";
import { Widgets } from "./dbConnectors";

export const resolvers = {
  getProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.findById({ _id: id }, (err, product) => {
        if (err) reject(err);
        else resolve(product);
      });
    });
  },
  getAllProducts: () => {
    return Widgets.find({});
  },
  createProduct: ({ input }) => {
    const newWidget = Widgets({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      stores: input.stores,
    });

    newWidget.id = newWidget._id;
    return new Promise((resolve) => {
      newWidget.save((err) => {
        if (err) return reject(err);
        else resolve(newWidget);
      });
      // my approuch
      //   Widgets.create(input, function (err, small) {
      //     if (err) return reject(err);
      //     else resolve(small);
      //   });
    });
  },
  updateProduct: ({ input }) => {
    return new Promise((resolve) => {
      Widgets.findOneAndUpdate(
        { _id: input.id },
        input,
        {
          new: true,
        },
        (err, product) => {
          if (err) reject(err);
          else resolve(product);
        }
      );
    });
  },
  deleteProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.remove({ _id: id }, (err) => {
        if (err) reject(err);
        else resolve(`Successfully deleted widget with id: ${id}`);
      });
    });
  },
};

export default resolvers;
