package vn.iworkspace.core.utility;

public interface Accessor<T, A> {

	public A get(T t);

	public Class<A> getAttributeClass();

	public Class<T> getTypeClass();

}
