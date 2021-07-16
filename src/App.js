import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  tabStyle: {
    borderRadius: "15px",
    "& .MuiTabs-flexContainer": {
      background: "#dedede",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        "& button": { maxWidth: "100%" }
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        "& button+button::before": {
          marginLeft: "-12px",
          marginRight: "12px",
          content: "'|'"
        }
      }
    }
  }
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        TabIndicatorProps={{ style: { display: "none" } }}
        className={classes.tabStyle}
      >
        <Tab value="one" label="Tab" wrapped {...a11yProps("one")} />
        <Tab value="two" label="Item Two" {...a11yProps("two")} />
        <Tab value="three" label="Item Three" {...a11yProps("three")} />
      </Tabs>

      <TabPanel value={value} index="one">
        Item One
      </TabPanel>
      <TabPanel value={value} index="two">
        Item Two
      </TabPanel>
      <TabPanel value={value} index="three">
        Item Three
      </TabPanel>
    </div>
  );
}
