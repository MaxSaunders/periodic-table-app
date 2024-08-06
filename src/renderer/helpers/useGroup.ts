import { useSearchParams } from "react-router-dom";

const GROUP_PARAM = "group";
const GROUP_HOVER_PARAM = "group_hover";

const useGroup = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const group = searchParams.get(GROUP_PARAM);
  const hoveredGroup = searchParams.get(GROUP_HOVER_PARAM);

  const setHoveredGroup = (id?: string) => {
    searchParams.delete(GROUP_HOVER_PARAM);
    if (id) {
      searchParams.set(GROUP_HOVER_PARAM, id);
    }
    setSearchParams(searchParams);
  };

  const setSelectedGroup = (id?: string) => {
    searchParams.delete(GROUP_PARAM);
    if (id) {
      searchParams.set(GROUP_PARAM, id);
    }
    setSearchParams(searchParams);
  };

  const toggleSelectedGroup = (id?: string) => {
    if (group === id) {
      setSelectedGroup();
    } else {
      setSelectedGroup(id);
    }
  };

  const getMouseOverProps = (id: string) => ({
    onMouseOver: () => setHoveredGroup(id),
    onMouseOut: () => setHoveredGroup(""),
  });

  const currentSelection = hoveredGroup ?? group;

  return {
    currentSelection,
    getMouseOverProps,
    setSelectedGroup,
    setHoveredGroup,
    toggleSelectedGroup,
    clearSelected: () => {
      setHoveredGroup();
      setSelectedGroup();
    },
  };
};

export default useGroup;
