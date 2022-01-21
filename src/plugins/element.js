/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-07 14:28:26
 * @FilePath: \VScode\vue\vue-order-control\src\plugins\element.js
 * @LastEditTime: 2021-12-30 14:59:43
 * @LastEditors: RayseaLee
 */
import Vue from 'vue'
import { 
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Menu,
  Submenu,
  MenuItem,
  Main,
  Aside,
  Container,
  Header,
  Col,
  Row,
  Dialog,
  Card,
  Table,
  TableColumn,
  Pagination,
  Switch,
  Tooltip,
  MessageBox,
  Select,
  Option,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  Tree,
  Upload,
  Tabs,
  TabPane,
  Collapse,
  CollapseItem,
  Cascader,
  TimePicker,
  TimeSelect,
  Avatar,
  Alert,
  Steps,
  Step
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Header)
Vue.use(Col)
Vue.use(Row)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tree)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(TimePicker)
Vue.use(TimeSelect)
Vue.use(Avatar)
Vue.use(Alert)
Vue.use(Steps)
Vue.use(Step)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
