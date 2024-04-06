import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"

import Link from "next/link"

const Navbar = () => {
  return (
    <Breadcrumb className="flex items-center justify-between max-w-[1400px] my-0 mx-auto py-[10px] px-[20px]">
      <BreadcrumbList className="text-xl">
        <BreadcrumbItem className="item">
          <Link href="/">Workout Bro</Link>
        </BreadcrumbItem>

      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Navbar