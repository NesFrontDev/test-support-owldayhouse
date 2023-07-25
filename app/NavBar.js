"use client"
import './globals.css'
import React,{useState,useEffect} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import { Divider } from '@mui/material';
import Prvider from './Redux/Prvider';
import { useSelector,useDispatch } from 'react-redux';
import { remove,removeLastItemById,add } from './Redux/CartSlice'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BackspaceIcon from '@mui/icons-material/Backspace';


export default function RootLayout({ children }) {

  const item = useSelector((state)=>state.cart)
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartList,setCartList]= useState([])
  const [totalPrice,setTotalPrice]= useState(0)
  const dispatch = useDispatch()

  useEffect(()=>{
    filterTypeProduct()
  },[item])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    filterTypeProduct()
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItemInCart = (item) => {
    dispatch(remove(item))
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function filterSumCountByProperty(arr, key) {
    const uniqueValues = [];
    const countMap = new Map();
    const priceSumMap = new Map();
    let totalPrice = 0;
  
    arr.forEach((item) => {
      const value = item[key];
      if (!countMap.has(value)) {
        countMap.set(value, 1);
        uniqueValues.push(item);
        priceSumMap.set(value, item.price);
      } else {
        countMap.set(value, countMap.get(value) + 1);
        priceSumMap.set(value, priceSumMap.get(value) + item.price);
      }
  
      totalPrice += item.price;
    });
  
    const resultArray = uniqueValues.map((item) => ({
      ...item,
      count: countMap.get(item[key]),
      priceSum: priceSumMap.get(item[key])
    }));
  
    return {
      data: resultArray,
      totalPrice: totalPrice
    };
  }

  const filterTypeProduct = () => {
    const { data: resultArray, totalPrice } = filterSumCountByProperty(item, "id");
    setCartList(resultArray)
    setTotalPrice(totalPrice)
  }

  const removeItemById =(e)=>{
    dispatch(removeLastItemById(e))
  }
  const addItem =(e)=>{
    const data = item.filter((item)=>{
      return item.id == e
    })
    dispatch(add(data[0]))
  }

  return (
    
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{px:'4%',pr:"12%",bgcolor:'white',width:'101%'}}>
              <Toolbar>
              
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color:"black",fontWeight: 'bold' }}>
                  My Shop
                </Typography>
                <IconButton aria-label="cart" onClick={handleClick} >
                    <Badge  badgeContent={item.length} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                {/* <Button aria-describedby={id}  variant="text" onClick={handleClick}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,justifyContent:'flex-end',display:'flex' ,color:"black"}}>
                  Cart({item.length})
                </Typography>
                </Button> */}
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                   {item.length > 0
                   ? <>
                        {cartList.map((e,index)=>(
                          <Box key={index} sx={{p:1,display:'flex'}}>
                            <img
                            style={{ width: "20%", height: 60 }}
                            alt={e.image}
                            src={e.image}
                          />
                          <Grid container justifyContent={'space-between'} direction="column" alignItems="flex-start"  sx={{pl:1 ,width:'55%'}}>
                            <Typography>
                              {e.title.length  > 16
                                ?<>{e.title.substring (0, 16)}...</>
                                :<>{e.title}</>
                              }
                            </Typography>
                            <Box sx={{display:'flex' ,justifyContent:'center',alignItems:'center',pl:1}}>
                            
                              <Button onClick={()=>removeItemById(e.id)} sx={{width:'20px',height:'20px',minWidth: '20px',color:'black'}}>
                                -
                              </Button>
                              <Typography sx={{px:1}}>{e.count}</Typography>
                             
                             <Button onClick={()=>addItem(e.id)} sx={{width:'20px',height:'20px',minWidth: '20px',color:'black'}} >
                                +
                              </Button>
                            
                            </Box>
                          </Grid>
                          <Grid container justifyContent={'space-between'} direction="column" alignItems="flex-end" sx={{width: "25%",pr:1}}>
                            <Grid item >
                              <BackspaceIcon onClick={()=>handleDeleteItemInCart(e.id)} />
                            </Grid>
                            <Grid item >
                              <Typography >${e.priceSum}</Typography>
                            </Grid>
                          </Grid>
                          </Box>
                        ))
                      }
                   </>
                   : <Box>

                   </Box>
                  }
                
                  <Divider sx={{py:0.5,width:310}}/>
                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{ px: 2 ,py:1 ,fontWeight:'bold' }}>Total</Typography>
                    <Typography sx={{ px: 2 ,py:1 ,fontWeight:'bold'}}>${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  
                </Popover>
                
              </Toolbar>
            </AppBar>
          </Box>
    
  )
}
