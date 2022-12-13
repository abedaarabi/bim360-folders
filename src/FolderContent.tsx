import * as React from "react";
import { styled } from "@mui/material/styles";
import FolderIcon from "@mui/icons-material/Folder";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import CircularProgress from "@mui/material/CircularProgress";

import ArticleIcon from "@mui/icons-material/Article";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { data } from "./data";
import { EditAttributes } from "@mui/icons-material";
import { getFolderContents, transformData } from "./helper";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Versions from "./Versions";

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.mode,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

export default function FolderContent({ id, type }: any) {
  const { data, isLoading } = useQuery(
    ["FolderContents", id, type],
    getFolderContents
  ) as any;

  return (
    <TreeView
      aria-label="forge"
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon color="info" />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 54 }} />}
      // sx={{
      //   width: "auto",
      // }}
      sx={{ maxWidth: 600 }}
    >
      {isLoading ? (
        <CircularProgress size={28} />
      ) : (
        transformData(data).map((i: any) => (
          <StyledTreeItem
            sx={{ pl: 2, pt: 0.8 }}
            key={i.id}
            onClick={() => {
              if (i.type === "items") {
                // setVersion(i.id);
                console.log(i, "lunch viewer");
              }
            }}
            nodeId={i.id}
            labelText={i.name || ""}
            labelIcon={i.type === "folders" ? FolderIcon : ArticleIcon}
          >
            <FolderContent {...i} />
            {i.type === "items" && <Versions id={i.id} />}
          </StyledTreeItem>
        ))
      )}
    </TreeView>
  );
}
