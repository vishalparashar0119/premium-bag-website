import UserModel from "../models/UserModel.js";


export const myAccount = async (req, res) => {

      try {
            const user = await UserModel.findOne({ email: req.user.email }).populate('orderHistory').select('-password')
            return res.status(200).json({ success: true, user: user });
      } catch (error) {
            console.log('User controller : myAccount ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went wrong!' })
      }

}


export const addToCart = async (req, res) => {
      try {
            const { email } = req.user;
            const { id } = req.params;
            const user = await UserModel.findOne({ email: email });


            const inTheCart = user.cart.some((items) => { return items.products.toString() == id });


            if (inTheCart) return res.status(409).json({ success: false, message: 'Already have in cart' });

            user.cart.push({
                  products: id
            });
            await user.save()
            return res.status(200).json({ success: true, message: 'Add to cart successfully' });

      } catch (error) {
            console.log('User controller : Add To Cart::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went wrong!' })
      }
}

export const fetchDataFromCart = async (req, res) => {
      try {
            const { email } = req.user;
            const cartData = await UserModel.findOne({ email }).populate('cart.products');

            return res.status(200).json({ success: true, cartData })
      } catch (error) {
            console.log('User controller : Fetch Data From Cart ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went wrong!' })
      }
}

export const removeToCart = async (req, res) => {
      try {
            const { id } = req.params;
            const { email } = req.user;

            const user = await UserModel.findOne({ email: email }).select('-password');

            const inTheCart = user.cart.some((items) => { return items.products.toString() == id })

            if (inTheCart) {
                  user.cart = user.cart.filter((items) => { return items.products.toString() !== id });
                  await user.save();

                  const updatedCart = await user.populate('cart.products');
                  return res.status(200).json({ success: true, message: 'Remove from cart successfully', cartData: updatedCart.cart });
            }


            return res.status(404).json({ success: false, message: 'product not found in cart' })


      } catch (error) {
            console.log('User controller : Remove To Cart ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went wrong!' })
      }
}

export const updateQuantity = async (req, res) => {
      try {
            const { id, action } = req.body;
            const { email } = req.user;

            const value = action == 'increase' ? 1 : -1;
            const user = await UserModel.findOneAndUpdate({ email: email, 'cart.products': id }, {
                  $inc: { 'cart.$.quantity': value }
            }, { new: true });

            const updatedCart = await user.populate('cart.products');
            return res.status(200).json({ success: true, message: 'updated quantity', updatedCart })
      } catch (error) {
            console.log('User controller : Update Quantity ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went wrong!' })
      }
}

export const updateUser = async (req, res) => {
      try {
            const { email, fullName, phoneNo, address } = req.body;
            const user = await UserModel.findOneAndUpdate({ email }, {
                  $set: { fullName, phoneNo, address }
            }, {
                  new: true
            }).populate({
                  path: 'orderHistory',
                  populate: {
                        path: 'productId',
                        model: 'Product'
                  }
            }).select('-password');

            return res.status(200).json({
                  success: true, message: 'Updated user successfully'
                  , user
            });

      } catch (error) {
            console.log('User Controller : Update User ::', error.message);
            return res.status(500).json({ success: false, message: 'Somthing went worng!' });
      }
}