import { useSearchParams } from "react-router-dom";

const CATEGORY_PARAM = "category";
const CATEGORY_VALUE_PARAM = "category_value";
const HOVERED_CATEGORY_PARAM = "category_hover";
const HOVERED_VALUE_PARAM = "hovered_value";

type CATEGORY = "group" | "state";

const useCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get(CATEGORY_PARAM);
  const categoryValue = searchParams.get(CATEGORY_VALUE_PARAM);
  const hoveredCategory = searchParams.get(HOVERED_CATEGORY_PARAM);
  const hoveredValue = searchParams.get(HOVERED_VALUE_PARAM);

  const setHoveredCategory = (category?: CATEGORY, id?: string) => {
    searchParams.delete(HOVERED_CATEGORY_PARAM);
    searchParams.delete(HOVERED_VALUE_PARAM);
    if (category) {
      searchParams.set(HOVERED_CATEGORY_PARAM, category);
    }
    if (id) {
      searchParams.set(HOVERED_VALUE_PARAM, id);
    }
    setSearchParams(searchParams);
  };

  const setSelectedCategory = (category?: CATEGORY, id?: string) => {
    searchParams.delete(CATEGORY_PARAM);
    searchParams.delete(CATEGORY_VALUE_PARAM);
    if (category) {
      searchParams.set(CATEGORY_PARAM, category);
    }
    if (id) {
      searchParams.set(CATEGORY_VALUE_PARAM, id);
    }
    setSearchParams(searchParams);
  };

  const toggleSelectedCategory = (newCategory?: CATEGORY, newId?: string) => {
    if (category === newCategory && newId === categoryValue) {
      setSelectedCategory();
    } else {
      setSelectedCategory(newCategory, newId);
    }
  };

  const getMouseOverProps = (category: CATEGORY, id: string) => ({
    onMouseOver: () => setHoveredCategory(category, id),
    onMouseOut: () => setHoveredCategory(),
  });

  const currentValue = hoveredValue ?? categoryValue;
  const currentCategory = hoveredCategory ?? category;

  return {
    currentValue,
    currentCategory,
    getMouseOverProps,
    setSelectedCategory,
    setHoveredCategory,
    toggleSelectedCategory,
    clearSelected: () => {
      setHoveredCategory();
      setSelectedCategory();
    },
  };
};

export default useCategory;
